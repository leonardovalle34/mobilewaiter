import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/cartitem";
import { FormatCurrency } from "../../utils/formartcurrency";
import { Button } from "../button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text"
import {Item, ProductContainer, Actions, Image, QuantityContainer, ProductDetail, Summary, TotalContainer} from "./style"
import { Product } from "../../types/product"
import { OrderConfirm } from "../orderconfirmed/index"
import { useState } from "react";
import { Api } from "../../utils/api";

interface CartProps{
    cartItems: CartItem[];
    onAdd: (product : Product)=>void;
    onDecrement: (product : Product)=> void;
    onConfirmOrder: ()=>void;
    selectedTable : string;
}
export function Cart({cartItems , onAdd, onDecrement, onConfirmOrder, selectedTable}:CartProps){

    const [isModalVisible , setIsModalVisible] = useState(false)
    const [isLoading , setIsLoading] = useState(false)

    const total = cartItems.reduce((acc, cartItem)=>{
        return acc + cartItem.quantity * cartItem.product.price
    },0)

    async function handleConfirmOrder(){
        setIsLoading(true)

        const payload= {
            table : selectedTable,
            products: cartItems.map((cartItem)=> ({
                product: cartItem.product._id,
                quantity: cartItem.quantity,
            })),
        };
        await Api.post('/orders', payload)

        setIsLoading(false)
        setIsModalVisible(true)

        
    }
    function handleOk(){
        onConfirmOrder();
        setIsModalVisible(false)
    }

    return(
        <>
            <OrderConfirm 
                visible={isModalVisible}
                onOk={handleOk}
                
            />
            {cartItems.length > 0 &&(
                <FlatList
                    data={cartItems}
                    keyExtractor={cartItem => cartItem.product._id}
                    showsVerticalScrollIndicator={false}
                    style={{marginBottom: 20, maxHeight: 150}}
                    renderItem={({item: cartItem})=>(
                        <Item>
                        <ProductContainer>
                                <Image
                                    source={{
                                        uri : `http://192.168.1.10:3001/uploads/${cartItem.product.imagePath}`,
                                    }}
                                />
                            <QuantityContainer>
                                <Text size={14} color="#666">
                                    {cartItem.quantity}x
                                </Text>
                            </QuantityContainer>
                            <ProductDetail>
                                <Text size={14} weight="600" style={{marginTop: 4}}>{cartItem.product.name}</Text>
                                <Text size={14} color="666">{FormatCurrency(cartItem.product.price)}</Text>
                            </ProductDetail>
                        </ProductContainer>
                        <Actions>
                                    <TouchableOpacity 
                                        style={{marginRight: 24}}
                                        onPress={()=> onAdd(cartItem.product)}
                                    >
                                        <PlusCircle/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>onDecrement(cartItem.product)}
                                    >
                                        <MinusCircle/>
                                    </TouchableOpacity>
                            </Actions> 
                        </Item>
                    )}
                />
            )}
            
            <Summary>
                <TotalContainer>
                    {cartItems.length > 0 ?(
                        <>
                            <Text color="#666">Total</Text>
                            <Text size={20} weight="600">{FormatCurrency(total)}</Text>
                        </>  
                    ):(
                        <Text color="#999">Seu carrinho está vazio</Text>
                    )}
                </TotalContainer>
                <Button loading={isLoading} label="Confirmar Pedido" onPress={handleConfirmOrder} disabled={cartItems.length ===0}></Button>
            </Summary>
        </>
    )
};
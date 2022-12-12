import { FlatList, Modal } from "react-native"
import { Text } from "../Text"
import {Product} from "../../types/product"
import { Image, 
    CloseButton, 
    Header, 
    ModalBody, 
    IngredientsContainer, 
    Ingredient,
    Footer,
    FooterContainer,
    PriceContainer,

} from "./style"
import { Close } from "../Icons/Close";
import { FormatCurrency } from "../../utils/formartcurrency";
import { Button } from "../button";
import { products } from "../../mocks/products";

interface ProductModalProps{
    visible: boolean;
    onClose: ()=>void;
    product : null | Product;
    onAddToCart:(product : Product)=>void;
}
export function ProductModal({visible, onClose, product, onAddToCart}: ProductModalProps){

    function handleAddToCart(){
        onAddToCart(product!);
        onClose();
    }

    if(!product){
        return null
    }
    return(
        <Modal
            onRequestClose={onClose}
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <Image
                source={{
                    uri : `http://192.168.1.10:3001/uploads/${product.imagePath}`,
                }}
            >
                <CloseButton onPress={onClose}>
                    <Close/>
                </CloseButton>
            </Image>
            <ModalBody>
            <Header>
                <Text size={24} weight='600'>{product.name}</Text>
                <Text color="#666" style={{marginTop: 8}}>{product.description}</Text>
            </Header>
            {product.ingredients.length > 0 &&(
                <IngredientsContainer>
                    <Text weight="600" color="#666">Ingredientes</Text>
                    <FlatList
                        data={product.ingredients}
                        keyExtractor={ingredient => ingredient._id}
                        showsVerticalScrollIndicator={false}
                        style={{marginTop:16}}
                        renderItem={({item: ingredient})=>(
                            <Ingredient>
                                <Text>{ingredient.icon}</Text>
                                <Text size={14} color="#666" style={{marginLeft:20}}>{ingredient.name}</Text>
                            </Ingredient>
                        )}
                    />
                </IngredientsContainer>    
            )}
            
            </ModalBody>
            <Footer>
                <FooterContainer>
                    <PriceContainer>
                        <Text color="#666">Preço</Text>
                        <Text size={24} weight="600" >{FormatCurrency(product.price)}</Text>
                    </PriceContainer>
                    <Button onPress={()=>handleAddToCart(product)} label="Adicionar ao Pedido"/>
                </FooterContainer>
            </Footer>
        </Modal>
    )
}
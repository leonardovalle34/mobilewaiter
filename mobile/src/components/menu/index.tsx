
import { Productcontainer, ProductDetails , Image, separator , AddToCart, ProductContainer} from "./style"
import {Text} from "../Text"
import { FlatList, TouchableOpacity } from "react-native"
import { FormatCurrency } from "../../utils/formartcurrency"
import { CheckCircle } from "../Icons/CheckCircle"
import { PlusCircle } from "../Icons/PlusCircle"
import { ProductModal } from "../productmodal"
import { useState } from "react"
import { Product } from "../../types/product"

interface MenuProps{
    onAddToCart:(product : Product)=>void;
    products: Product[];
}
export function Menu({onAddToCart, products}:MenuProps){
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState < null | Product > (null)

    
    const handleOpenModal = (product:Product)=>{
        setIsModalVisible(true)
        setSelectedProduct(product)
    }
    return (
        <>
            <ProductModal 
                visible={isModalVisible}
                onClose={()=>setIsModalVisible(false)}  
                product={selectedProduct} 
                onAddToCart={onAddToCart} 
            />

            <FlatList
                data={products}    
                showsHorizontalScrollIndicator = {false}
                style={{marginTop: 32}}
                contentContainerStyle ={{paddingHorizontal: 24}}
                ItemSeparatorComponent={separator}
                keyExtractor={product => product._id}
                renderItem={({item:product})=>{
                    return(
                        <ProductContainer onPress={()=>handleOpenModal(product)}>
                            <Image
                                source={{
                                    uri : `http://192.168.1.10:3001/uploads/${product.imagePath}`,
                                }}
                            />
                            <ProductDetails>
                                <Text weight="600">{product.name}</Text>
                                <Text size={14} color="#666" style={{marginVertical : 8}}>{product.description}</Text>
                                <Text size={14} weight="600">{FormatCurrency(product.price)}</Text>
                            </ProductDetails>
                            
                            <AddToCart onPress={()=> onAddToCart(product)}>
                                <PlusCircle/>
                            </AddToCart>
                    </ProductContainer>
                    )
                }}
            />
        </>
    )

}
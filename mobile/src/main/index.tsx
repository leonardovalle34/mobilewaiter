import { Text } from "../components/Text"
import { Header } from "../components/header/header"
import { Container , CategoriesContainer , MenuContainer, Footer , FooterContainer, CenteredContainer } from "./styles"
import { Button } from "../components/button"
import { Menu } from "../components/menu"
import { TableModal } from "../components/tablemodal"
import { useEffect, useState } from "react"
import { Cart } from "../components/cart"
import { CartItem } from "../types/cartitem"
import { Product } from  "../types/product"
import { Category } from "../types/category"
import { Categories } from "../components/categories/index"
import { ActivityIndicator, Appearance } from "react-native"
import { Empty } from "../components/Icons/Empty"
import { Api } from "../utils/api"


interface handleSaveTableProps{
    table : string;
}

export function Main(){
    const [showModal, setShowModal ] = useState(false)
    const [selectedTable , setSelectedTable] = useState("")
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isLoading , setIsLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoadingProducts , setIsLoadingProducts] = useState(false)



    useEffect(()=>{
        Promise.all([
            Api.get("/categories"),
            Api.get("/products"),
        ]).then(([categoriesResponse , productsResponse])=>{
            setCategories(categoriesResponse.data);
            setProducts(productsResponse.data);
            setIsLoading(false)
        })
    },[])

    function handleSaveTable (table:string){
        setSelectedTable(table)
    }

    function handleCancelOrder(){
        setSelectedTable("");
        setCartItems([]);
    }

    function handleAddCart(product: Product){
        if(!selectedTable){
            setShowModal(true)
        }
        setCartItems((prevState)=>{
            const ItemIndex = prevState.findIndex(
                cartItem => cartItem.product._id === product._id
            );
            if(ItemIndex < 0){
                return prevState.concat({
                    quantity: 1,
                    product,
                })
            }
            const newCartItems = [...prevState];
            const item = newCartItems[ItemIndex];

            newCartItems[ItemIndex] = {
                ...item,
                quantity: item.quantity + 1
            }

            return newCartItems
        })
    }
    function handleDecrement(product: Product){
        setCartItems((prevState)=>{
            const ItemIndex = prevState.findIndex(
                cartItem => cartItem.product._id === product._id
            );

            const item = prevState[ItemIndex];
            const newCartItems = [...prevState]

            if(item.quantity === 1){
               
                newCartItems.splice(ItemIndex, 1)

                return newCartItems
            }

            newCartItems[ItemIndex] = {
                ...item,
                quantity: item.quantity - 1
            }

            return newCartItems
        });
    }

    function handleConfirmOrder(){
        setSelectedTable ("");
        setCartItems([]);
    }
    async function handleSelectCategory(categoryId: string){
        const route = !categoryId
        ? "/products"
        :`/categories/${categoryId}/products`;

        setIsLoadingProducts(true)
        const {data} = await Api.get(route)
        setProducts(data);

        setIsLoadingProducts(false)
    }

    return(
        <>
            
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleCancelOrder}
                />
                {isLoading ?(
                    <>
                        <CenteredContainer>
                            <ActivityIndicator size='large' color='#D73035'/>
                        </CenteredContainer>
                    </> 
                ):(
                    <>
                       <CategoriesContainer>
                            <Categories
                                categories={categories}
                                onSelectCategory={handleSelectCategory}
                            />
                        </CategoriesContainer>

                        {isLoadingProducts? (
                            <CenteredContainer>
                                <ActivityIndicator size='large' color='#D73035'/>
                            </CenteredContainer> 
                        ):(
                            <>
                                {products.length > 0 ? (
                                    <MenuContainer>
                                        <Menu 
                                            onAddToCart={handleAddCart}
                                            products={products}    
                                        />
                                    </MenuContainer>
                                ):(
                                    <CenteredContainer>
                                        <Empty/>
                                        <Text color='#666' style={{marginTop: 24}}>Nenhum produto foi encontrado</Text>
                                    </CenteredContainer>
                                )}
                            </>
                        )}                           
                    </>
                )}
            </Container>
        
            <Footer>
                    {!selectedTable &&(
                        <Button label="Novo Pedido" onPress={()=>setShowModal(true)} disabled={isLoading}/>
                    )}
                    {selectedTable &&(
                        <Cart
                            cartItems={cartItems}
                            onAdd={handleAddCart}
                            onDecrement={handleDecrement}
                            onConfirmOrder={handleConfirmOrder}
                            selectedTable={selectedTable}
                        />
                    )}
            </Footer>
            <TableModal 
                visible={showModal}
                onClose={()=>setShowModal(false)}
                onSave={handleSaveTable}
            />
        </>
    )
}
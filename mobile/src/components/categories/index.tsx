import { CategoryContainer, Icon } from "./style"
import { Text } from "../Text"
import { FlatList } from "react-native"
import { Category } from "../../types/category"
import { useState } from "react"

interface CategoriesProps{
    categories : Category[];
    onSelectCategory : (categoryId: string)=> Promise<void>;
}

export function Categories({categories, onSelectCategory}:CategoriesProps ){
    const [selectedCategory, setSelectedCategory] = useState("");

    function handleSelectCategory(categoryId: string){
        const category = selectedCategory == categoryId ? "" : categoryId;

        onSelectCategory(category);
        setSelectedCategory(category);
    }

    
    return(
        <FlatList
            horizontal
            data={categories}
            contentContainerStyle={{paddingRight : 24}}
            keyExtractor={category => category._id}
            renderItem={({item: category})=>{
                const isSelected = selectedCategory == category._id;
                return(
                    <CategoryContainer onPress={()=>handleSelectCategory(category._id)}>
                        <Icon>
                            <Text>{category.icon}</Text>
                        </Icon>
                        <Text size={14} weight="600">{category.name}</Text>
                    </CategoryContainer>    
                )
            }}
        />
    )

}
import {Request , Response} from "express"
import { Category } from "../../models/category";



export async function deleteCategory(req: Request, res: Response){

    try{
    const { categoryId } = req.params;
    const category =  await Category.findByIdAndDelete(categoryId)

    res.json(category);
    }catch(error){
        console.log(error)
        res.status(500)
    }

}

import {Request , Response} from "express"

import { Category } from "../../models/category"

export async function listCategories(req: Request, res: Response){

    try{
        const category =  await Category.find()

        res.json(category);
    }catch(error){
        console.log(error)
        res.status(500)
    }

}

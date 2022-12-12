import {Request , Response} from "express"

import { Product } from '../../models/product'

export async function createProducts(req: Request, res: Response){

    try{
        console.log(req.file);
        const imagePath = req.file?.filename;
        const {name, description, price, category, ingredients} = req.body;
        const product = await Product.create({
            imagePath,
            name,
            description,
            price: Number(price),
            category,
            ingredients : ingredients ? JSON.parse(ingredients) : []
        })
        res.status(201).json(product);
    }catch(error){
        console.log(error)
        res.status(500)
    }

}

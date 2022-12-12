import {Request , Response} from "express"

import { Product } from '../../models/product'

export async function listProducts(req: Request, res: Response){

    try{

    const product =  await Product.find();

    res.json(product);
    }catch(error){
        console.log(error)
        res.status(500)
    }

}

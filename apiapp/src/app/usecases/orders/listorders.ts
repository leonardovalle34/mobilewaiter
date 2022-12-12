import {Request , Response} from "express"

import { Order } from '../../models/order'

export async function listOrders(req: Request, res: Response){

    try{

    const order =  await Order.find()
        .sort({createdAt: 1})
        .populate("products.product");

    res.json(order);
    }catch(error){
        console.log(error)
        res.status(500)
    }

}

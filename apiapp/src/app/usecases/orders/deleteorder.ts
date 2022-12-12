import {Request , Response} from "express"

import { Order } from '../../models/order'

export async function deleteOrders(req: Request, res: Response){

    try{
    const {orderId} = req.params
    await Order.findByIdAndDelete(orderId)

    res.sendStatus(204);
    }catch(error){
        console.log(error)
        res.status(500)
    }

}

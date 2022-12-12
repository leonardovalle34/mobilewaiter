import {Request , Response} from "express"
import { Order } from "../../models/order";


export async function changeOrderStatus(req: Request, res: Response){

    try{
    const { orderId } = req.params;

    const status =  req.body.status;

    if(!['WAITING','IN_PRODUCTION','DONE'].includes(status)){
        return res.status(400).json({
            error:'Status should be one of these'
        })
    }
    await Order.findByIdAndUpdate(orderId, {status});
    res.sendStatus(204);

    }catch(error){
        console.log(error)
        res.status(500)
    }

}

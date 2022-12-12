import { Container } from "./styles";
import { OrderComponent } from "../ordercomponent/index";
import { Order } from "../../types/order";
import { useEffect, useState } from "react";
import { api } from '../../utils/api';
import  socketIo from 'socket.io-client'


export function Orders(){

  const [orders , setOrders] = useState<Order[]>([]);

  useEffect(()=>{
    const socket = socketIo("http://localhost:3001", {
        transports: ['websocket']
    });

    socket.on("Order@new", (order)=>{
        setOrders(prevState => prevState.concat(order));
    });
  },[])

  useEffect(()=>{
    api.get("/orders")
      .then(({data})=>{
        setOrders(data)
      })
    },[]);

    const waiting = orders.filter((order)=>order.status === "WAITING");
    const inprododuction = orders.filter((order)=>order.status === "IN_PRODUCTION");
    const done = orders.filter((order)=>order.status === "DONE");

    function handleCancelOrder(orderId: string){
        setOrders((prevState)=>prevState.filter(order => order._id !== orderId))
    }

    function handleOrderStatusChange(orderId: string, status: Order['status']){
        setOrders((prevState)=>prevState.map((order)=>(
            order._id === orderId
            ? {...order, status}
            : order
        )));
    }

    return(
        <Container>
            <OrderComponent
                icon="⏱"
                title="Fila de espera"
                orders={waiting}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange}
            />
            <OrderComponent
                icon="🥓"
                title="Em produçao"
                orders={inprododuction}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange}
            />
            <OrderComponent
                icon="✔"
                title="Pronto!"
                orders={done}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange}
            />
        </Container>
    )
}


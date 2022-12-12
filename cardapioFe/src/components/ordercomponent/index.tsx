import { Board , OrdersContainer } from "./style"
import { Order } from "../../types/order"
import { OrderModal } from "../ordermodal/index"
import { useState } from "react";
import { api } from '../../utils/api';
import { toast } from "react-toastify"

interface OrderBoardProps{
    icon:string;
    title: string;
    orders:Order[];
    onCancelOrder: (orderId : string) => void;
    onChangeOrderStatus: (orderId : string, status: Order["status"]) => void;
}

export function OrderComponent({icon, title, orders, onCancelOrder, onChangeOrderStatus}: OrderBoardProps){
    const [ modalVisibility , setModalVisibility ] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
    const [isLoading, setIsLoading] = useState(false)
    
    const handleOpenModal = (order: Order)=>{
        setModalVisibility(true);
        setSelectedOrder(order);
    }

    function handleCloseModal(){
        setModalVisibility(false);
        setSelectedOrder(null);
    }

    function handleChangeOrderStatus(){
        setIsLoading(true)

        const newStatus = selectedOrder?.status === "WAITING"
        ? "IN_PRODUCTION"
        :"DONE";

        api.patch(`/orders/${selectedOrder?._id}`,{status: newStatus});

        toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado`)

        onChangeOrderStatus(selectedOrder!._id , newStatus);
        setIsLoading(false);
        setModalVisibility(false);
    }

    async function handleCancelOrder(){
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve,3000));
        await api.delete (`/orders/${selectedOrder?._id}`);

        toast.success(`O pedido da mesa ${selectedOrder?.table} foi Cancelado`)

        onCancelOrder(selectedOrder!._id);
        setIsLoading(false);
        setModalVisibility(false);
    }

    return(
        <Board>
            <OrderModal 
                visible={modalVisibility}
                order={selectedOrder}
                onClose={handleCloseModal}
                onCancelOrder={handleCancelOrder}
                isLoading={isLoading}
                onChangeOrderStatus={handleChangeOrderStatus}
            />
                <header>
                    <span>{icon}</span>
                    <strong>{title}</strong>
                    <span>({orders.length})</span>
                </header>

                {orders.length > 0  && (
                    <OrdersContainer>
                        {orders.map((order)=>(
                            <button type="button" key={order._id} onClick={()=>handleOpenModal(order)}>
                            <strong>Mesa {order.table}</strong>
                            <span>{order.products.length}</span>
                            </button>
                        ))}
                    </OrdersContainer>
                )}
            </Board>
    )
}
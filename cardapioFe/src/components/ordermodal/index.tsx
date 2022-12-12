import { OverLay, ModalBody, OrderDetails, Actions } from "./style"
import closeIcon from "../../assets/images/close-icon.svg"
import {Order} from "../../types/order"
import { Orders } from "../orders";
import {FormatCurrency} from "../../utils/formatcurrency"

interface OrderModalProps {
    visible : boolean;
    order : Order | null;
    onClose: ()=> void;
    onCancelOrder: ()=>Promise<void>;
    isLoading : boolean;
    onChangeOrderStatus: () => void;
    
}

export function OrderModal({visible,order,onClose, onCancelOrder,isLoading,onChangeOrderStatus}: OrderModalProps){
    if(visible == false || !order){
        return null;
    }

    let total = 0;

    order.products.forEach(({product, quantity})=>{
        total += product.price * quantity
    })

    return(
        <OverLay>
            <ModalBody>
                <header>
                    <strong>Mesa {order.table}</strong>
                    <button type="button"onClick={onClose}>
                        <img src={closeIcon} alt="btn fechar"/>
                    </button>
                </header>
                <div className="status-container">
                    <small>Status pedido</small>
                    <div>
                        <span>
                            {order.status === "WAITING" && "⏱"}
                            {order.status === "IN_PRODUCTION" && "🛠"}
                            {order.status === "DONE" && "✔"}
                        </span>
                        <strong>
                            {order.status === "WAITING" && "Fila de Espera"}
                            {order.status === "IN_PRODUCTION" && "Em Preparação"}
                            {order.status === "DONE" && "Pronto!"}
                        </strong>
                    </div>
                </div>
                <OrderDetails>
                    <strong>Itens</strong>
                    <div className="order-items">
                        {order.products.map(({_id,product,quantity})=>(
                            <div className="item" key={_id}>
                                    <img src={`http://localhost:3001/uploads/${product.imagePath}`} 
                                alt={product.name}
                                width="56"
                                height="28.51"
                                />
                                <span className="quantity">{quantity}x</span>

                                <div className="product-details">
                                    <strong>{product.name}</strong>
                                    <span>{FormatCurrency(product.price)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="total"> 
                            <span>Total</span>
                            <strong>{FormatCurrency(total)}</strong>
                    </div> 
                </OrderDetails>
                <Actions>
                    {order.status !== "DONE" &&(
                        <button 
                            type="button" 
                            className="primary" 
                            disabled={isLoading}
                            onClick={onChangeOrderStatus}
                        >
                            <span>
                                {order.status === 'WAITING' && '👩‍🍳'}
                                {order.status === 'IN_PRODUCTION' && '✅'}
                                
                            </span>
                            <span>
                                {order.status === 'WAITING' && 'Iniciar Produção'}
                                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
                                
                            </span>
                        </button>
                    )}
                    <button 
                        type="button" 
                        className="secondary"
                        onClick={onCancelOrder}
                        disabled={isLoading}
                    >
                            {order.status === 'WAITING' && 'Cancelar Pedido'}
                            {order.status === 'IN_PRODUCTION' && 'Cancelar Pedido'}
                            {order.status === 'DONE' && 'Finalizar Pedido'}
                                
                    </button>
                </Actions>
            </ModalBody>
        </OverLay>
    )
}
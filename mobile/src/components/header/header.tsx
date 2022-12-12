import { Touchable, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Container, Content, OrderHeader, Table } from "./style";

interface HeaderProps{
    selectedTable : string;
    onCancelOrder : ()=>void;
}

export function Header({selectedTable, onCancelOrder}:HeaderProps){
    return(
        <Container>
            {!selectedTable &&(
                <>
                    <Text size={14} opacity={0.9}>Bem vindo ao</Text>
                    <Text size={24} weight='700'>Waiter
                        <Text size={24}>APP</Text>
                    </Text>
                </>
            )}
            {selectedTable &&(
                <Content>
                    <OrderHeader>
                        <Text size={24} weight="600">Pedido</Text>
                        <TouchableOpacity onPress={onCancelOrder}>
                            <Text color='#D73035' weight="600" size={14}>Cancelar Pedido</Text>
                        </TouchableOpacity>
                    </OrderHeader>
                    <Table>
                        <Text color='#666'>Mesa {selectedTable}</Text>
                    </Table>
                </Content>
            )}
        </Container>
    )
}
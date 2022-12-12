import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import {Container, OkButton} from "./style"
import {Text} from "../Text"
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

interface OrderModalProps{
    visible: boolean
    onOk: ()=> void
}
export function OrderConfirm({visible, onOk}:OrderModalProps){
    
    return(
        <Modal
            visible={visible}
            animationType="fade"
        >
            <StatusBar style="light"/>
            <Container>
                <CheckCircle/>
                <Text size={20} weight="600" color="#fff" style={{marginTop: 12}}>Pedido Confirmado</Text>
                <Text  color="#fff" opacity={0.9} style={{marginTop: 4}}>O pedido ja entrou na fila de produção</Text>
                <OkButton onPress={onOk}>
                    <Text color="#D73035" weight="600">OK</Text>
                </OkButton>
            </Container>
            
        </Modal>
    )
}
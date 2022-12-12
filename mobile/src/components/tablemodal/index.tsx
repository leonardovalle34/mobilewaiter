import { Modal, TouchableOpacity, Platform } from "react-native";
import { OverLay, ModalBody , Header , Form, Input } from "./style";
import { Text} from "../Text";
import { Close } from "../Icons/Close";
import { Button } from "../button";
import { useState } from "react";

interface TableModalProps{
    visible: boolean;
    onClose: () => void;
    onSave :(table:string) => void;
}

export function TableModal({visible, onClose, onSave}:TableModalProps){

    const [table, setTable] = useState("");

    const handleSave = ()=>{
        setTable("")
        onSave(table);
        onClose()     
    }
    
    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
        >
            <OverLay behavior={Platform.OS == "android" ? 'height' : 'padding'}>
                <ModalBody>
                    <Header>
                        <Text weight="600">Informe a mesa</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Close color="#666"/>
                        </TouchableOpacity>
                    </Header>
                    <Form>
                        <Input
                            onChangeText={setTable}
                            keyboardType="number-pad"
                            placeholder="Numero da mesa"
                            placeholderTextColor='#666'
                        />

                        <Button label="Salvar" onPress={handleSave} disabled={table.length == 0}/>
                    </Form>
                </ModalBody>
            </OverLay>
        </Modal>
    )
}
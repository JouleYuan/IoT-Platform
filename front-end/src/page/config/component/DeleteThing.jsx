import { useState } from 'react';
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function DeleteThing(props){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return(
        <>
            <DeleteOutlined onClick={showModal}/>
            <Modal title="删除设备" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
                <p>{"你确认要删除设备\"" + props.device.name + "\"吗？（设备ID：" + props.device.id + "）"}</p>
            </Modal>
        </>
    )
}

export default DeleteThing;
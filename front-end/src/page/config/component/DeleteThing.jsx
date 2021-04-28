import React from 'react';
import axios from "../../tool/Axios";
import { useState } from 'react';
import { Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import updateDeviceData from "../../tool/UpdateDeviceData";

function DeleteThing(props){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        axios({
            method: 'delete',
            url: '/device',
            params:{
                id: props.device.id,
            }
        }).then(function(response){
            if(response.data.data === true){
                message.success(response.data.msg);
                updateDeviceData(props.setCard);
            }else{
                message.error(response.data.msg);
            }
        });
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
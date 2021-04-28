import React from 'react';
import axios from "../../tool/Axios";
import { useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import FormItemLayout from "../../tool/FormItemLayout";
import updateDeviceData from "../../tool/UpdateDeviceData";

function SetThing(props){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        form.submit();
    };

    const onFinish = (values) => {
        axios({
            method: 'put',
            url: '/device',
            data: {
                'id': props.device.id,
                'name': values.name,
            },
            header:{
                'Content-Type':'application/json',
            },
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

    return(
        <>
            <SettingOutlined onClick={showModal}/>
            <Modal title="修改设备" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
                <Form {...FormItemLayout(24, 4, 24, 20)}
                      onFinish={onFinish}
                      form = {form}
                >
                    <Form.Item
                        name="id"
                        label="设备ID"
                    >
                        <Input key={props.device.id} defaultValue={props.device.id} disabled/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="设备名称"
                        rules={[
                            {
                                whitespace: true,
                                message: '请输入设备名称',
                            },
                            {
                                validator: (_, value) => {
                                    if (value) return Promise.resolve();
                                    return Promise.reject(new Error('请输入设备名称'));
                                }
                            },
                        ]}
                    >
                        <Input key={props.device.name} defaultValue={props.device.name}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default SetThing;
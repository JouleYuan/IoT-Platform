import React from 'react';
import axios from "../../tool/Axios";
import { useState } from 'react';
import { Modal, Button, Col, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormItemLayout from "../../tool/FormItemLayout";
import updateDeviceData from "../../tool/UpdateDeviceData";

function AddThing(props){
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
            method: 'post',
            url: '/device',
            data: {
                'id': values.id,
                'name': values.name,
            },
            header:{
                'Content-Type':'application/json',
            },
        }).then(function(response){
            if(response.data.data === true){
                message.success(response.data.msg);
                updateDeviceData(props.setCard);
            }
            else{
                message.error(response.data.msg);
            }
        });
        form.setFieldsValue({
            id: "",
            name: "",
        });
        setIsModalVisible(false);
    };

    return(
        <Col span={6} className="add-thing-col">
            <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined className="thing-card-plus"/>}
                className="add-thing-card"
                onClick={showModal}
            />
            <Modal title="添加新设备" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
                <Form {...FormItemLayout(24, 4, 24, 20)}
                      onFinish={onFinish}
                      form={form}
                >
                    <Form.Item
                        name="id"
                        label="设备ID"
                        rules={[
                            {
                                whitespace: true,
                                message: '请输入设备ID',
                            },
                            {
                                validator: (_, value) => {
                                    if (value) return Promise.resolve();
                                    return Promise.reject(new Error('请输入设备ID'));
                                }
                            },
                        ]}
                    >
                        <Input />
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
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    )
}

export default AddThing;
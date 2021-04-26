import { useState } from 'react';
import { Modal, Button, Col, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormItemLayout from "../../tool/FormItemLayout";

function AddThing(){
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
        console.log('Received values of form: ', values);
        form.setFieldsValue({
            id: "",
            name: "",
        });
        setIsModalVisible(false);
    };

    return(
        <Col span={6}>
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
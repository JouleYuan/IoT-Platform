import { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import FormItemLayout from "../../tool/FormItemLayout";

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
        console.log('Received values of form: ', values);
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
                        <Input defaultValue={props.device.id} disabled/>
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
                        <Input defaultValue={props.device.name}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default SetThing;
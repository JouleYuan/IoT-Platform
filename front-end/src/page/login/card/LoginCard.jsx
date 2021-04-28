import React from 'react';
import axios from '../../tool/Axios';
import { useState } from 'react';
import { Form, Input, Button, Card, Modal } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import "./LoginCard.css"

function LoginCard(){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [msg, setMsg] = useState("登录失败!");

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        axios({
            method: 'post',
            url: '/user/login',
            data: {
                'email': values.email,
                'password': values.password,
            },
            header:{
                'Content-Type':'application/json',
            },
        }).then(function(response){
            if(response.data.data === true) window.location.href = "/";
            else {
                setMsg(response.data.msg);
                showModal();
            }
        });
    };

    return(
        <>
            <Card className="login-card" title="物联网平台" >
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: '请输入正确的邮箱格式',
                            },
                            {
                                required: true,
                                message: '请输入邮箱',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="邮箱" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        或者 <a href={"/registration"}>现在注册！</a>
                    </Form.Item>
                </Form>
            </Card>
            <Modal title="Notification" visible={isModalVisible} onCancel={handleOk} footer={[
                <Button key="OK" type="primary" onClick={handleOk}>
                    确认
                </Button>]}>
                <p>{msg}</p>
            </Modal>
        </>
    )
}

export default LoginCard;
import { useState } from 'react';
import { Form, Input, Card, Button, Modal } from 'antd';
import "./LoginCard.css"
import axios from "../../tool/Axios";
import FormItemLayout from "../../tool/FormItemLayout";

function RegistrationCard(){
    const [isModalVisible, setIsModalVisible] = useState(false);

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
            url: '/user/signup',
            data: {
                'name': values.name,
                'email': values.email,
                'password': values.password,
            },
            header:{
                'Content-Type':'application/json',
            },
        }).then(function(response){
            if(response.data.data === true) window.location.href = "/login";
            else showModal();
        });
    };

    return (
        <>
            <Card className="register-card" title="新用户注册">
                <Form
                    {...FormItemLayout(24, 4, 24, 20)}
                    name="register"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        label="用户名"
                        rules={[
                            {
                                whitespace: true,
                                message: '请输入用户名',
                            },
                            {
                                validator: (_, value) => {
                                    if (value) return Promise.resolve();
                                    return Promise.reject(new Error('请输入用户名'));
                                }
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '请输入正确的邮箱格式',
                            },
                            {
                                whitespace: true,
                                message: '请输入邮箱',
                            },
                            {
                                validator: (_, value) => {
                                    if (value) return Promise.resolve();
                                    return Promise.reject(new Error('请输入邮箱'));
                                }
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                validator: (rule, value, callback) => {
                                    const oNumber = new RegExp(/\d/);
                                    const oLetter = new RegExp(/[a-zA-Z]/);
                                    const oSpecial = '.~!@#$%^&*()_+=-{}|:<>?,./[]-;\\"';

                                    if (!value) {
                                        callback('请输入密码');
                                        return;
                                    }

                                    if (value.length < 6) {
                                        callback('密码不能小于六位，至少含字母、数字、特殊字符其中的2种');
                                        return;
                                    }

                                    try {
                                        [...value].forEach(val => {
                                            if (
                                                !(
                                                    oNumber.test(val) ||
                                                    oLetter.test(val) ||
                                                    oSpecial.indexOf(val) >= 0
                                                )
                                            ) {
                                                throw new Error();
                                            }
                                        });
                                    } catch (e) {
                                        callback('密码不能小于六位，至少含字母、数字、特殊字符其中的2种');
                                    }

                                    const contain = [false, false, false];

                                    [...value].forEach(val => {
                                        if (oNumber.test(val)) {
                                            contain[0] = true;
                                        }
                                        if (oLetter.test(val)) {
                                            contain[1] = true;
                                        }
                                        if (oSpecial.indexOf(val) >= 0) {
                                            contain[2] = true;
                                        }
                                    });

                                    if (contain.filter(item => item === true).length < 2) {
                                        callback('密码不能小于六位，至少含字母、数字、特殊字符其中的2种');
                                        return;
                                    }
                                    callback();
                                }
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (value) return Promise.resolve();
                                    return Promise.reject(new Error('请再次输入密码'));
                                }
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('请输入和此前相同的密码'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Modal title="Notification" visible={isModalVisible} onCancel={handleOk} footer={[
                <Button key="OK" type="primary" onClick={handleOk}>
                    确认
                </Button>]}>
                <p>注册失败！</p>
            </Modal>
        </>
    );
}

export default RegistrationCard;
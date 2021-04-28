import React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { DownOutlined, UserOutlined, PoweroffOutlined, LoginOutlined } from '@ant-design/icons';
import axios from '../tool/Axios';
import "./Head.css";

const { Header } = Layout;
const { SubMenu } = Menu;

function Head(props){
    const [name, setName] = useState("");
    useEffect(async ()=>{
        if(props.id === null || props.id === undefined){
            setName("游客")
        } else {
            axios({
                method: 'get',
                url: '/user/info',
                params:{
                    id: props.id,
                }
            }).then(function(response){
                setName(response.data.data.name);
            });
        }
    });

    const onExit = () => {
        axios({
            method: 'delete',
            url: '/user/logout',
        });
        window.location.href = "/";
    };

    const onLogin = () => {
        window.location.href = "/login";
    };

    const MenuItems = (status) => {
        if(status === null  || props.id === undefined) return (
            <Menu.Item key="login" icon={<LoginOutlined />} onClick={onLogin}>登录</Menu.Item>
        );
        else return (
            <>
                <Menu.Item key="exit" icon={<PoweroffOutlined />} onClick={onExit}>退出登录</Menu.Item>
            </>
        )
    };

    return(
        <Header className="header-layout">
            <div className="header-logo" />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={[props.index]}>
                <Menu.Item key="1" onClick={()=>{window.location.href='/'}}>首页</Menu.Item>
                <Menu.Item key="2" onClick={()=>{window.location.href='/config'}}>设备配置</Menu.Item>
                <Menu.Item key="3" onClick={()=>{window.location.href='/search'}}>数据查询</Menu.Item>
                <Menu.Item key="4" onClick={()=>{window.location.href='/map'}}>设备地图</Menu.Item>
                <a href={"/"}>
                    <Avatar className="header-avatar" size="large" icon={<UserOutlined />}/>
                </a>
                <SubMenu key="SubMenu" icon={<DownOutlined />} title={name} className="header-username">
                    {MenuItems(props.id)}
                </SubMenu>
            </Menu>
        </Header>
    )
}

export default Head;
import React from 'react';
import axios from "../tool/Axios";
import { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import Head from "../common/Head";
import Foot from "../common/Foot";
import GetWinSize from "../tool/GetWinSize";
import Main from "../common/Main";
import updateDeviceData from "../tool/UpdateDeviceData";
import Number from "./component/Number";
import MessageTimeLine from "./component/MessageTimeLine";
import MessageDeviceHistogram from "./component/MessageDeviceHistogram";
import IntervalRadio from "./component/IntervalRadio";
import './Home.css'

const { Content } = Layout;

function Home() {
    const [device, setDevice] = useState([]);
    const [message, setMessage] = useState([]);
    const [interval, setInterval] = useState(86400000);

    useEffect(()=>{
        updateDeviceData(setDevice);
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: '/message',
        }).then(function(response){
            setMessage(response.data.data);
        });
    }, []);

    const size = GetWinSize();

    const homePage = (id) => {
        return(
            <Layout style={{minHeight: size.height}}>
                <Head index='1' id={id}/>
                <Content className="content-layout">
                    <Number device={device} message={message}/>
                    <Row gutter={10} justify="center" align="middle">
                        <Col span={24}>
                            <MessageDeviceHistogram device={device} message={message}/>
                        </Col>
                        <Col span={24}>
                            <MessageTimeLine message={message} interval={interval}/>
                        </Col>
                        <Col span={24} className="interval-radio-col">
                            <IntervalRadio interval={interval} setInterval={setInterval}/>
                        </Col>
                    </Row>
                </Content>
                <Foot/>
            </Layout>
        )
    };

    return (
        <Main page={homePage}/>
    )
}

export default Home;
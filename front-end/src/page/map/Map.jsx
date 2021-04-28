import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Head from "../common/Head";
import Foot from "../common/Foot";
import GetWinSize from "../tool/GetWinSize";
import Main from "../common/Main";
import TrackMap from "./component/TrackMap";
import updateDeviceData from "../tool/UpdateDeviceData";
import axios from "../tool/Axios";

const { Content } = Layout;

function Map(){
    const [device, setDevice] = useState([]);
    const [message, setMessage] = useState([]);

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

    const searchPage = (id) => {
        return (
            <>
                <Layout style={{height: size.height}}>
                    <Head index='4' id={id}/>
                    <Content className="content-layout" style={{height: '100%'}}>
                        <TrackMap device={device} message={message}/>
                    </Content>
                    <Foot/>
                </Layout>
            </>
        )
    };

    return (
        <Main page={searchPage}/>
    )
}

export default Map;
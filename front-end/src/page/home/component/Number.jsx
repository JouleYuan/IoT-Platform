import React from 'react';
import { Statistic, Row, Col } from 'antd';

function Number(props){
    return(
        <Row gutter={30} justify="center" className="home-number">
            <Col span={6}>
                <Statistic title="设备总量" value={props.device.length} valueStyle={{ color: '#096dd9' }}/>
            </Col>
            <Col span={6}>
                <Statistic title="在线总量" value={props.device.filter((item)=>item.status === "在线").length} valueStyle={{ color: '#389e0d' }}/>
            </Col>
            <Col span={6}>
                <Statistic title="总信息量" value={props.message.length} valueStyle={{ color: '#d4380d' }}/>
            </Col>
        </Row>
    )
}

export default Number;
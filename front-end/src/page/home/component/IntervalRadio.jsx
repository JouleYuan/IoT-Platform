import React from 'react';
import { Radio, Space, Typography } from 'antd';

const { Title } = Typography;

function IntervalRadio(props){
    const onChange = e => {
        props.setInterval(e.target.value);
    };

    return (
        <Radio.Group onChange={onChange} value={props.interval} className="interval-radio">
            <Space>
                <Title level={5} className="interval-radio-title">间隔时间</Title>
                <Radio value={1000}>1秒</Radio>
                <Radio value={10000}>10秒</Radio>
                <Radio value={60000}>1分钟</Radio>
                <Radio value={3600000}>1小时</Radio>
                <Radio value={86400000}>1天</Radio>
                <Radio value={604800000}>1周</Radio>
            </Space>
        </Radio.Group>
    )
}

export default IntervalRadio;
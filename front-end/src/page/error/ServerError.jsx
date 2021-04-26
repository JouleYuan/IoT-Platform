import React from 'react';
import { Result } from 'antd';

function ServerError() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="服务器错误"
        />
    )
}

export default ServerError;
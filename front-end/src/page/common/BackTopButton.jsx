import React from 'react';
import { BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import "./BackTopButton.css"

function BackTopButton() {
    return(
        <BackTop>
            <VerticalAlignTopOutlined className="back-top-button"/>
        </BackTop>
    )
}

export default BackTopButton;
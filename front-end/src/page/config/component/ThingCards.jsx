import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Card, List } from 'antd';
import AddThing from "./AddThing";
import DeleteThing from "./DeleteThing";
import SetThing from "./SetThing";
import updateDeviceData from "../../tool/UpdateDeviceData";
import "./ThingCard.css"

function operations(id, device, setCard) {
    if(id === null || id === undefined) return [];
    else return [<SetThing device={device} setCard={setCard}/>, <DeleteThing device={device} setCard={setCard}/>,];
}

function addButton(id, setCard) {
    if(id === null || id === undefined) return <div/>;
    else return <AddThing setCard={setCard}/>
}

function ThingCards(props){
    const [card, setCard] = useState([]);
    useEffect(async ()=>{
        updateDeviceData(setCard);
    }, card);

    return(
        <Row gutter={[30, 30]}>
            {
                card.map((item)=>(
                    <Col span={6}>
                        <Card
                            actions={operations(props.id, item, setCard)}
                        >
                            <List itemLayout="horizontal">
                                <List.Item>
                                    <List.Item.Meta
                                        title="设备名称"
                                        description={item.name}
                                    />
                                </List.Item>
                                <List.Item>
                                    <List.Item.Meta
                                        title="设备ID"
                                        description={item.id}
                                    />
                                </List.Item>
                                <List.Item>
                                    <List.Item.Meta
                                        title="设备状态"
                                        description={item.status}
                                    />
                                </List.Item>
                            </List>
                        </Card>
                    </Col>
                ))
            }
            {addButton(props.id, setCard)}
        </Row>
    )
}

export default ThingCards;
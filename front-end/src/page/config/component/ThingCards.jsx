import { Row, Col, Card, List } from 'antd';
import "./ThingCard.css"
import AddThing from "./AddThing";
import DeleteThing from "./DeleteThing";
import SetThing from "./SetThing";

const card = [
    {
        name: "天猫精灵",
        id: "device0005",
        status: "在线",
    },
    {
        name: "索尼OLED智能电视",
        id: "device0002",
        status: "离线",
    }
];

function operations(id, device) {
    if(id === null || id === undefined) return [];
    else return [<SetThing device={device}/>, <DeleteThing device={device}/>,];
}

function addButton(id) {
    if(id === null || id === undefined) return <div/>;
    else return <AddThing/>
}

function ThingCards(props){
    return(
        <Row gutter={[30, 30]}>
            {
                card.map((item)=>(
                    <Col span={6}>
                        <Card
                            actions={operations(props.id, item)}
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
            {addButton(props.id)}
        </Row>
    )
}

export default ThingCards;
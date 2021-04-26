import { Layout } from 'antd';
import Head from "../common/Head";
import Foot from "../common/Foot";
import GetWinSize from "../tool/GetWinSize";
import ThingCards from "./component/ThingCards";
import BackTopButton from "../common/BackTopButton";
import Main from "../common/Main";

const { Content } = Layout;

function Config(){
    const size = GetWinSize();

    const configPage = (id) => {
        return (
            <>
                <Layout style={{minHeight: size.height}}>
                    <Head index='2' id={id}/>
                    <Content className="content-layout">
                        <ThingCards id={id}/>
                    </Content>
                    <Foot/>
                </Layout>
                <BackTopButton/>
            </>
        )
    };

    return (
        <Main page={configPage}/>
    )
}

export default Config;
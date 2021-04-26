import { Layout } from 'antd';
import Head from "../common/Head";
import Foot from "../common/Foot";
import GetWinSize from "../tool/GetWinSize";
import BackTopButton from "../common/BackTopButton";
import Main from "../common/Main";

const { Content } = Layout;

function Map(){
    const size = GetWinSize();

    const searchPage = (id) => {
        return (
            <>
                <Layout style={{minHeight: size.height}}>
                    <Head index='4' id={id}/>
                    <Content className="content-layout">

                    </Content>
                    <Foot/>
                </Layout>
                <BackTopButton/>
            </>
        )
    };

    return (
        <Main page={searchPage}/>
    )
}

export default Map;
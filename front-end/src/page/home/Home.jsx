import { Layout } from 'antd';
import Head from "../common/Head";
import Foot from "../common/Foot";
import GetWinSize from "../tool/GetWinSize";
import BackTopButton from "../common/BackTopButton";
import Main from "../common/Main";

const { Content } = Layout;

function Home() {
    const size = GetWinSize();

    const homePage = (id) => {
        return(
            <>
                <Layout style={{minHeight: size.height}}>
                    <Head index='1' id={id}/>
                    <Content className="content-layout">
                    </Content>
                    <Foot/>
                </Layout>
                <BackTopButton/>
            </>
        )
    };

    return (
        <Main page={homePage}/>
    )
}

export default Home;
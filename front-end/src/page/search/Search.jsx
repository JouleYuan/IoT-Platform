import React from 'react';
import { Layout } from 'antd';
import Head from "../common/Head";
import Foot from "../common/Foot";
import GetWinSize from "../tool/GetWinSize";
import BackTopButton from "../common/BackTopButton";
import Main from "../common/Main";
import DataTable from "./component/DataTable";

const { Content } = Layout;

function Search(){
    const size = GetWinSize();

    const searchPage = (id) => {
        return (
            <>
                <Layout style={{minHeight: size.height}}>
                    <Head index='3' id={id}/>
                    <Content className="content-layout">
                        <DataTable/>
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

export default Search;
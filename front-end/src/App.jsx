import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './App.css';
import './page/common/Content.css'
import Config from './page/config/Config';
import Login from './page/login/Login';
import Home from './page/home/Home';
import ServerError from "./page/error/ServerError";
import Search from "./page/search/Search";
import Map from "./page/map/Map";

function App(){
    return (
        <div className="App">
            <ConfigProvider locale={zhCN}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/config">
                            <Config/>
                        </Route>
                        <Route exact path="/search">
                            <Search/>
                        </Route>
                        <Route exact path="/map">
                            <Map/>
                        </Route>
                        <Route exact path="/error/server">
                            <ServerError/>
                        </Route>
                        <Route path="/:login" component={Login}/>
                    </Switch>
                </Router>
            </ConfigProvider>
        </div>
    )
}

export default App;

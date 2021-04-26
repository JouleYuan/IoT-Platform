import GetWinSize from "../tool/GetWinSize";
import LoginCard from "./card/LoginCard";
import "./Login.css";
import RegistrationCard from "./card/RegistrationCard";

function Login(props){
    const size = GetWinSize();

    const selector = (key) => {
        if(key==="login") return <LoginCard/>;
        else if(key==="registration") return <RegistrationCard/>;
        else return <div/>;
    };

    return(
        <div className="site-login-background" style={{ height: size.height }}>
            <div className="site-login-card">
                {selector(props.match.params.login)}
            </div>
            <div className="site-login-footer">IoT PlatForm ©2021 Created by Yuan Haoran</div>
        </div>
    )
}

export default Login;
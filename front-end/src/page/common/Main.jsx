import React from 'react';
import { useState, useEffect } from 'react';
import axios from "../tool/Axios";

function Main(props) {
    const [id, setId] = useState(undefined);
    const [status, setStatus] = useState(false);
    useEffect(async ()=>{
        axios({
            method: 'get',
            url: '/user/status',
        }).then(function(response){
            setId(response.data.data);
            setStatus(true);
        }).catch((error) => {
            setStatus(true);
        })
    });

    const selector = (id, status) => {
        if(status === false) return <div/>;
        else{
            if(id === undefined){
                window.location.replace("/error/server");
                return <div/>;
            } else return (<>{props.page(id)}</>);
        }
    };

    return (
        <>
            {selector(id, status)}
        </>
    )
}

export default Main;
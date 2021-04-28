package com.jouleyuan.IoT.backend.common.response;

import lombok.Data;

@Data
public class Response {
    private Object data;
    private String msg;
    private int code; // 0-Unknown Error 1-Success 2-Database Error
    public static final int UNKNOWN_ERROR = 0;
    public static final int SUCCESS = 1;
    public static final int DATABASE_ERROR = 2;
    public static final int AUTHORIZATION_ERROR = 3;

    public Response(Object data){
        this.data = data;
        this.msg = "OK";
        this.code = Response.SUCCESS;
    }

    public Response(Object data, String msg){
        this.data = data;
        this.msg = msg;
        this.code = Response.SUCCESS;
    }

    public Response(Object data, String msg, int code){
        this.data = data;
        this.msg = msg;
        this.code = code;
    }
}

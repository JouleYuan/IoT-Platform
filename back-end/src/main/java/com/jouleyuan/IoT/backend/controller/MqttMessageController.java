package com.jouleyuan.IoT.backend.controller;


import com.jouleyuan.IoT.backend.common.response.Response;
import com.jouleyuan.IoT.backend.service.impl.MqttMessageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author jobob
 * @since 2021-04-26
 */
@RestController
@RequestMapping("/message")
public class MqttMessageController{
    @Autowired
    private MqttMessageServiceImpl mqttMessageService;

    @GetMapping
    public Response getMessages(){
        return new Response(mqttMessageService.list());
    }
}

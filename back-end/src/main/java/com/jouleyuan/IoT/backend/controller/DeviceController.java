package com.jouleyuan.IoT.backend.controller;


import com.jouleyuan.IoT.backend.common.response.Response;
import com.jouleyuan.IoT.backend.entity.Device;
import com.jouleyuan.IoT.backend.service.impl.DeviceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author jobob
 * @since 2021-04-26
 */
@RestController
@RequestMapping("/device")
public class DeviceController{
    @Autowired
    private DeviceServiceImpl deviceService;

    @GetMapping
    public Response getDevice(){
        return new Response(deviceService.list());
    }

    @PostMapping
    public Response postDevice(@RequestBody Device deviceForm, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null) return new Response(false, "会话已过期", Response.AUTHORIZATION_ERROR);
        try{
            return new Response(deviceService.save(deviceForm), "添加成功");
        } catch(DataAccessException e){
            return new Response(false, "设备ID冲突，添加失败", Response.DATABASE_ERROR);
        }
    }

    @PutMapping
    public Response updateDevice(@RequestBody Device deviceForm, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null) return new Response(false, "会话已过期", Response.AUTHORIZATION_ERROR);
        try{
            return new Response(deviceService.updateById(deviceForm), "更新成功");
        } catch(DataAccessException e){
            return new Response(false, e.getMessage(), Response.DATABASE_ERROR);
        }
    }

    @DeleteMapping
    public Response deleteDevice(@RequestParam(value = "id") String id, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null) return new Response(false, "会话已过期", Response.AUTHORIZATION_ERROR);
        try{
            return new Response(deviceService.removeById(id), "删除成功");
        } catch(DataAccessException e){
            return new Response(false, e.getMessage(), Response.DATABASE_ERROR);
        }
    }
}

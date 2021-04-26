package com.jouleyuan.IoT.backend.controller;


import com.jouleyuan.IoT.backend.common.response.Response;
import com.jouleyuan.IoT.backend.entity.User;
import com.jouleyuan.IoT.backend.service.impl.UserServiceImpl;
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
@RequestMapping("/user")
public class UserController{
    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(value="/info", method = RequestMethod.GET)
    public Response getInfo(@RequestParam(value = "id") int id){
        return new Response(userService.getNameAndEmailByID(id));
    }

    @RequestMapping(value="/signup", method=RequestMethod.POST)
    public Response signup(@RequestBody User signupForm){
        try{
            return new Response(userService.save(signupForm));
        }catch(DataAccessException e){
            return new Response(false, e.getMessage(), Response.DATABASE_ERROR);
        }
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public Response login(@RequestBody User loginForm, HttpServletRequest request){
        User user = userService.getByEmail(loginForm.getEmail());
        if(user == null) return new Response(false, "邮箱不存在!");
        if(user.getPassword().equals(loginForm.getPassword())){
            HttpSession session = request.getSession();
            session.setAttribute("id", user.getId());
            return new Response(true);
        }else return new Response(false, "密码错误!");
    }

    @RequestMapping(value="/logout", method=RequestMethod.DELETE)
    public void logout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null) session.invalidate();
    }

    @RequestMapping(value="/status", method=RequestMethod.GET)
    public Response checkStatus(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null) return new Response(null);
        else return new Response(session.getAttribute("id"));
    }
}

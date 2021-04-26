package com.jouleyuan.IoT.backend.user.controller;

import com.jouleyuan.IoT.backend.common.response.Response;
import com.jouleyuan.IoT.backend.user.entity.User;
import com.jouleyuan.IoT.backend.user.service.impl.UserServiceImpl;
import com.mysql.cj.jdbc.exceptions.SQLError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(value="/info", method = RequestMethod.GET)
    public Response getInfo(@RequestParam(value = "id") int id){
        return new Response(userService.getNameAndEmailByID(id));
    }

    @RequestMapping(value="/signup", method=RequestMethod.POST)
    public Response signup(@RequestBody User signupForm, HttpServletRequest request){
        try{
            return new Response(userService.save(signupForm));
        }catch(DataAccessException e){
            return new Response(false, e.getMessage(), Response.DATABASE_ERROR);
        }
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public Response login(@RequestBody User loginForm, HttpServletRequest request){
        User user = userService.getByEmail(loginForm.getEmail());
        if(user == null) return new Response(false, "Email does not exist!");
        if(user.getPassword().equals(loginForm.getPassword())){
            HttpSession session = request.getSession();
            session.setAttribute("id", user.getId());
            return new Response(true);
        }else return new Response(false, "Password is wrong!");
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

package com.jouleyuan.IoT.backend.user.service.impl;

import java.util.*;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.jouleyuan.IoT.backend.user.entity.User;
import com.jouleyuan.IoT.backend.user.mapper.UserMapper;
import com.jouleyuan.IoT.backend.user.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
    public User getNameAndEmailByID(int id){
        QueryWrapper<User> qw = new QueryWrapper<>();
        qw.select("name", "email").eq("id", id);
        List<User> userList = super.list(qw);
        if(userList.isEmpty()) return new User();
        else return userList.get(0);
    }

    public User getByEmail(String email){
        QueryWrapper<User> qw = new QueryWrapper<>();
        qw.eq("email", email);
        List<User> userList = this.list(qw);
        if(userList.isEmpty()) return null;
        else return userList.get(0);
    }
}

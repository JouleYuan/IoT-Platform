package com.jouleyuan.IoT.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.jouleyuan.IoT.backend.entity.User;
import com.jouleyuan.IoT.backend.mapper.UserMapper;
import com.jouleyuan.IoT.backend.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author jobob
 * @since 2021-04-26
 */
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

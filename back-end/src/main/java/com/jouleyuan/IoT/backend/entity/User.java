package com.jouleyuan.IoT.backend.entity;

import lombok.Data;

/**
 * <p>
 * 
 * </p>
 *
 * @author jobob
 * @since 2021-04-26
 */
@Data
public class User{

    private Long id;

    private String name;

    private String email;

    private String password;


}

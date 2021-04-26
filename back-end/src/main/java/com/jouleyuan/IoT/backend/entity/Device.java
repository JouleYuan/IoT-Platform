package com.jouleyuan.IoT.backend.entity;

import java.time.LocalDateTime;
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
public class Device{

    private String id;

    private String name;

    private Long timestamp;

}

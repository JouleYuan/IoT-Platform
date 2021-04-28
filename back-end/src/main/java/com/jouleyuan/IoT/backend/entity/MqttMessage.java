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
public class MqttMessage{
    private long id;

    private String clientId;

    private String info;

    private Integer value;

    private Integer alert;

    private Double lng;

    private Double lat;

    private String address;

    private Long timestamp;

}

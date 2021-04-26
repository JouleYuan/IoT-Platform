package com.jouleyuan.IoT.backend.service.impl;

import com.jouleyuan.IoT.backend.entity.MqttMessage;
import com.jouleyuan.IoT.backend.mapper.MqttMessageMapper;
import com.jouleyuan.IoT.backend.service.IMqttMessageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author jobob
 * @since 2021-04-26
 */
@Service
public class MqttMessageServiceImpl extends ServiceImpl<MqttMessageMapper, MqttMessage> implements IMqttMessageService {

}

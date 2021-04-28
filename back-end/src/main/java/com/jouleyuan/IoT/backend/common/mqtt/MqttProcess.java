package com.jouleyuan.IoT.backend.common.mqtt;

import com.jouleyuan.IoT.backend.entity.Device;
import com.jouleyuan.IoT.backend.entity.MqttMessage;
import com.jouleyuan.IoT.backend.service.impl.DeviceServiceImpl;
import com.jouleyuan.IoT.backend.service.impl.MqttMessageServiceImpl;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class MqttProcess {
    @Autowired
    private DeviceServiceImpl deviceService;

    @Autowired
    private MqttMessageServiceImpl mqttMessageService;

    public static MqttProcess mqttProcess;

    @PostConstruct
    public void init(){
        mqttProcess = this;
        mqttProcess.deviceService = this.deviceService;
        mqttProcess.mqttMessageService = this.mqttMessageService;
    }

    static CloseableHttpClient client = HttpClients.createDefault();

    final static String AK = "4GyddLDnLsOgsgT78y5ZIGhmT9hfMHwL";
    final static String BASE_URL = "http://api.map.baidu.com/reverse_geocoding/v3/?output=json&coordtype=bd09ll";

    String getAddress(Double lat, Double lng){
        String url = BASE_URL + "&ak=" + AK + "&location=" + lat + "," + lng;
        HttpGet get = new HttpGet(url);
        try{
            HttpResponse response = client.execute(get);
            HttpEntity entity = response.getEntity();
            String json = EntityUtils.toString(entity);
            String name = "\"formatted_address\"";
            int index = json.indexOf(name);
            if(index == -1) return "解析失败";
            int head_index = json.indexOf('\"', index + name.length() + 1) + 1;
            int tail_index = json.indexOf('\"', head_index);
            return json.substring(head_index, tail_index);
        }catch(Exception e){
            return "解析失败";
        }
    }

    void processMessage(MqttMessage msg){
        try{
            Device device = mqttProcess.deviceService.getById(msg.getClientId());
            if(device == null) return;

            device.setTimestamp(msg.getTimestamp());
            mqttProcess.deviceService.updateById(device);

            msg.setAddress(getAddress(msg.getLat(), msg.getLng()));
            mqttProcess.mqttMessageService.save(msg);

        }catch(DataAccessException e){
            System.out.println(e.getMessage());
        }
    }
}

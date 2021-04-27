package com.jouleyuan.IoT.backend.common.mqtt;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.jupiter.api.Test;
import sun.net.www.http.HttpClient;

import static org.junit.jupiter.api.Assertions.*;

public class MqttProcessTest {
    final static String AK = "4GyddLDnLsOgsgT78y5ZIGhmT9hfMHwL";
    final static String BASE_URL = "http://api.map.baidu.com/reverse_geocoding/v3/?output=json&coordtype=wgs84ll";

    @Test
    public void testURL(){
        double lat = 31.225696563611;
        double lng = 121.49884033194;
        String url = BASE_URL + "&ak=" + AK + "&location=" + lat + "," + lng;
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet get = new HttpGet(url);
        try{
            HttpResponse response = client.execute(get);
            HttpEntity entity = response.getEntity();
            String json = EntityUtils.toString(entity);
            String name = "\"formatted_address\"";
            int index = json.indexOf(name);
            if(index == -1){
                System.out.println("解析失败");
                return;
            }
            int head_index = json.indexOf('\"', index + name.length() + 1) + 1;
            int tail_index = json.indexOf('\"', head_index);
            System.out.println(json.substring(head_index, tail_index));
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }
}
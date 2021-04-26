package cn.edu.zju.cs.bs;

import java.io.FileInputStream;
import java.util.Properties;
import java.util.Vector;

public class IOTClient {
    public static void main(String[] args) {
        try {
            Properties properties = new Properties();
            FileInputStream in = new FileInputStream("src/main/resources/iot.properties");
            properties.load(in);
            int devices = Integer.parseInt(properties.getProperty("devices"));
            String mqttServer = properties.getProperty("server");
            String topic = properties.getProperty("topic");
            String clientPrefix = properties.getProperty("prefix");

            Vector<WorkerThread> threadVector = new Vector<WorkerThread>();
            for (int i = 0; i < devices; i++) {
                WorkerThread thread = new WorkerThread();
                thread.setDeviceId(i + 1);
                thread.setMqttServer(mqttServer);
                thread.setTopic(topic);
                thread.setClientPrefix(clientPrefix);
                threadVector.add(thread);
                thread.start();
            }
            for (WorkerThread thread : threadVector) {
                thread.join();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

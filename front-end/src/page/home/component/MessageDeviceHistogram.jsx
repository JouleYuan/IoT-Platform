import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function MessageDeviceHistogram(props){
    const option = {
        tooltip: {
            trigger: 'axis',
        },
        title: {
            x: 'center',
            y: 'bottom',
            text: '设备信息量图',
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: ['所有信息', '正常信息', '异常信息']
        },
        xAxis: {
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '所有信息',
            data: [],
            barMaxWidth: 70,
            type: 'bar'
        },{
            name: '正常信息',
            data: [],
            barMaxWidth: 70,
            type: 'bar'
        },{
            name: '异常信息',
            data: [],
            barMaxWidth: 70,
            type: 'bar'
        }]
    };

    let chartInstance = null;
    const chartRef = useRef(null);

    useEffect(()=>{
        option.xAxis.data = props.device.map((item) => { return item.name; });
        let deviceId = props.device.map((item) => { return item.id; });
        for(let i = 0; i < deviceId.length; i++){
            option.series[0].data.push(0);
            option.series[1].data.push(0);
            option.series[2].data.push(0);
        }
        for(let i = 0; i < props.message.length; i++) {
            let index = deviceId.indexOf(props.message[i].clientId);
            option.series[0].data[index]++;
            if(props.message[i].alert === 0) option.series[1].data[index]++;
            else option.series[2].data[index]++;
        }

        const renderedInstance = echarts.getInstanceByDom(chartRef.current);
        if (renderedInstance) {
            chartInstance = renderedInstance;
        } else {
            chartInstance = echarts.init(chartRef.current);
        }
        chartInstance.setOption(option);

        window.addEventListener("resize",function(){
            chartInstance.resize();
        });
    }, [props.device, props.message]);

    return (
        <div>
            <div style={{width: '100%', height: "500px"}} ref={chartRef} />
        </div>
    )
}

export default MessageDeviceHistogram;
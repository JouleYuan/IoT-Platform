import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function MessageTimeLine(props){
    const option = {
        tooltip:{
            trigger: 'axis',
        },
        title: {
            x: 'center',
            y: 'bottom',
            text: '信息流量图',
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: ['所有信息', '正常信息', '异常信息']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '所有信息',
            data: [],
            type: 'line',
            symbol: 'none',
            smooth: true,
            areaStyle: {}
        },{
            name: '正常信息',
            data: [],
            type: 'line',
            symbol: 'none',
            smooth: true,
            areaStyle: {}
        },{
            name: '异常信息',
            data: [],
            type: 'line',
            symbol: 'none',
            smooth: true,
            areaStyle: {}
        }]
    };

    let chartInstance = null;
    const chartRef = useRef(null);

    useEffect(()=>{
        if(props.message.length > 0){
            let message = props.message.sort((a, b)=>{return b.timestamp - a.timestamp});
            let cur_time = new Date().getTime();
            let time = cur_time - cur_time % props.interval + props.interval;
            for(let i = 0, j = 0; j < 50; j++){
                time -= props.interval;
                option.xAxis.data.push(new Date(time).toLocaleString('ja-JP'));
                option.series[0].data.push(0);
                option.series[1].data.push(0);
                option.series[2].data.push(0);
                while(i < message.length && message[i].timestamp >= time){
                    option.series[0].data[j]++;
                    if(message[i].alert === 0) option.series[1].data[j]++;
                    else option.series[2].data[j]++;
                    i++;
                }
            }
            option.xAxis.data = option.xAxis.data.reverse();
            option.series[0].data = option.series[0].data.reverse();
            option.series[1].data = option.series[1].data.reverse();
            option.series[2].data = option.series[2].data.reverse();
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
    }, [props.device, props.message, props.interval]);

    return (
        <div>
            <div style={{width: '100%', height: "500px"}} ref={chartRef} />
        </div>
    )
}

export default MessageTimeLine;

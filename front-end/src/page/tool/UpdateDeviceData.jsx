import axios from "./Axios";

const updateDeviceData = (setCard) => {
    axios({
        method: 'get',
        url: '/device',
    }).then(function(response){
        let data = response.data.data;
        let time = new Date().getTime();
        for(let i = 0; i < data.length; i++){
            if(data[i].timestamp === null) data[i].status = '离线';
            else{
                if(time - data[i].timestamp <= 60000){
                    data[i].status = '在线';
                }else data[i].status = '离线';
            }
        }
        setCard(data);
    })
};

export default updateDeviceData;
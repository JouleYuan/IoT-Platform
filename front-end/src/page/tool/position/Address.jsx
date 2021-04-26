import axios from '../Axios';

function getAddress(lat, lng){
    axios({
        method: 'get',
        url: 'http://api.map.baidu.com/reverse_geocoding/v3/',
        params: {
            ak: "yFpYyZaE8r3IMAAIbHxx7hA3MvrDNCzY",
            output: "json",
            coordtype: "wgs84ll",
            lacation: lat.toString() + "," + lng.toString(),
        }
    }).then(function(response){
        console.log(response);
    });
}

export default getAddress;
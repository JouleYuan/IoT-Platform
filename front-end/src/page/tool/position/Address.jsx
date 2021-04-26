import jsonp from 'jsonp';

function getAddress(lat, lng){
    jsonp('http://api.map.baidu.com/reverse_geocoding/v3/?' +
        'ak=yFpYyZaE8r3IMAAIbHxx7hA3MvrDNCzY' +
        '&output=json' +
        '&coordtype=wgs84ll' +
        '&location=31.225696563611,121.49884033194',
        null,
        (err, data) => {
            if (err) {
                console.error(err.message);
                return "未知"
            } else {
                console.log(data.result.formatted_address);
                return data.result.formatted_address
            }
        });
}

export default getAddress;
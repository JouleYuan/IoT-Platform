/**
 * @return {string}
 */
function ToDegree(decimalDegree) {
    decimalDegree = decimalDegree.toString();
    let i = decimalDegree.indexOf('.');
    const strDegree = i < 0 ? decimalDegree : decimalDegree.substring(0, i);//获取度
    let strMinute = 0;
    let strSecond = 0;
    if (i > 0) {
        strMinute = "0" + decimalDegree.substring(i);
        strMinute = strMinute * 60 + "";
        i = strMinute.indexOf('.');
        if (i > 0) {
            strSecond = "0" + strMinute.substring(i);
            strMinute = strMinute.substring(0, i);//获取分
            strSecond = strSecond * 60 + "";
            strSecond = parseFloat(strSecond).toFixed(0);
        }
    }
    return strDegree + "°" + strMinute + "'" + strSecond +"\"";
}

function getPosition(lat, lng){
    return ToDegree(lat) + "N, " + ToDegree(lng) + "E";
}

export default getPosition;
import axios from 'axios';

const instance = axios.create({
    baseURL:'http://47.100.55.98/api'
});

export default instance;
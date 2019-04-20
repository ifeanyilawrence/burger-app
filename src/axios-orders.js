import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-d56bd.firebaseio.com/'
    //baseURL: 'http://97.74.6.243/portal_dev'
});

export default instance;
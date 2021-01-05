import axios from "axios";

const instance = axios.create({
    baseURL : 'https://market-store-items.herokuapp.com/',
});

export default instance;

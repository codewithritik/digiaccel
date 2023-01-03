
import axios from 'axios';

const token = 'POINT YOUR TOKEN LOCATION HERE'

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333'
});

axios.defaults.headers = {
  Authorization: 'Bearer ' + token
}

export default api;
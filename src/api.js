import axios from 'axios';


const Api = () => axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});


export default {
  riskTypes: {
    all: () => Api().get('/risk_types/'),
    get: id => Api().get(`/risk_types/${id}/`),
  },
  risks: {
    create: payload => Api().post('/risks/', payload),
    all: () => Api().get('/risks/'),
    get: id => Api().get(`/risks/${id}/`),
  },
};

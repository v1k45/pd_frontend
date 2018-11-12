import axios from 'axios';


const Api = () => axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});


export default {
  riskTypes: {
    all: () => Api().get('/risk_types/'),
  },
};

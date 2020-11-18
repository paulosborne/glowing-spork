import axios from 'axios';

const { REACT_APP_POLICE_DATA_URL } = process.env;

const PoliceData = axios.create({
  baseURL: REACT_APP_POLICE_DATA_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default PoliceData;

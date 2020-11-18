import axios from 'axios';

const {
  REACT_APP_FOOTBALL_DATA_TOKEN,
  REACT_APP_FOOTBALL_DATA_URL,
} = process.env;

const FootballDataService = axios.create({
  baseURL: REACT_APP_FOOTBALL_DATA_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': REACT_APP_FOOTBALL_DATA_TOKEN,
  },
});

export default FootballDataService;

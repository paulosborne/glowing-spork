import axios from 'axios';

const { REACT_APP_POSTCODE_DATA_URL } = process.env;

const PostCodeService = axios.create({
  baseURL: REACT_APP_POSTCODE_DATA_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default PostCodeService;

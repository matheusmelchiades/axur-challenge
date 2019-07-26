import axios from 'axios'

const baseURL = process.env.REAC_APP_API_URL || 'http://localhost:5000';

const cancelToken = axios.CancelToken.source();

export default {
  ...axios.create({ baseURL, cancelToken: cancelToken.token }),
  cancelRequest: cancelToken.cancel
};

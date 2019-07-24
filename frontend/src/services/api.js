import axios from 'axios'

const baseURL = process.env.REAC_APP_API_URL || 'http://localhost:5000';

export default axios.create({ baseURL })

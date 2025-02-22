import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  auth: {
    username: process.env.REACT_APP_AUTH_USERNAME,
    password: process.env.REACT_APP_AUTH_PASSWORD,
  },
})

export default instance

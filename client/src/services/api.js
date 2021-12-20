import axios from 'axios'

const endpoints = {
  development: 'http://localhost:5000',
  production: 'https://rongorai-personal-website.herokuapp.com',
}

const api = axios.create({
  baseURL: endpoints[process.env.NODE_ENV],
})

export default api

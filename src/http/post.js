import axios from 'axios'

import { getData } from '../utils'

export default async (url, body) => {
  console.log(body)
  const token = await getData('token')
  return axios.post(url, body, {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(resp => resp.data)
    .catch(err => {
      if (err.code == 'ENOTFOUND') return {
        status: 1000,
        message: 'Network Error'
      }
      return {
        status: err.response.status,
        message: err.response.data
      }
    })
}
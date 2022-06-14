import axios from 'axios'

import { getData } from '../utils'

export default async (url, body) => {
  console.log(body)
  const token = await getData('token')
  return axios.put(url, body, {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(resp => resp.data)
    .catch(err => {
      if (err == 'Network Error') return {
        status: 1000,
        message: 'Network Error'
      }
      if (err.response.status >= 500) return {
        status: err.response.status,
        message: 'Internal Server Error'
      }
      // if (err.response.data == "Not Authorized") return 
      return {
        status: err.response.status,
        message: err.response.data
      }
    })
}
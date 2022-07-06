import axios from 'axios'

import config from '../../config'
import { getData } from '../utils'

export default async (url) => {
  const token = await getData('token')
  const api = axios.create({
    baseURL: config.API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    validateStatus: (stat) => true
  })

  return await api.get(url)
    .then(resp => ({
      data: resp.data,
      status: resp.status
    }))
    .catch(err => {
      if (err.response) {
        console.error(err.response)
        console.error(err.response.data)
        console.error(err.response.status)
      }
      else if (err.request) {
        console.error(err.request)
      }
      else {
        console.error(err.message)
      }
    })
}
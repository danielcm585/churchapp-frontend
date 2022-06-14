import axios from 'axios'

import { getData } from '../utils'

export default async (url) => {
  const token = await getData('token')
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    }
  }).then(resp => resp.data)
    .catch(err => err.response)
}
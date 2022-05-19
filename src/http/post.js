import axios from 'axios'

import { getData } from '../utils'

export default async function(url, body) {
  const token = await getData('token')
  return axios.get(url, body, {
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+token
    }
  }).catch(err => `${err}`)
}


import axios from 'axios'

import { getData } from '../utils'

export default function(url) {
  const token = getData('token')
  return axios.get(url, {
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+token 
    }
  }).catch(err => `Error: ${err}`)
}
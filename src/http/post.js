import axios from 'axios'

import { getData } from '../utils'

export default function(url, body) {
  const token = getData('token')
  return resp = axios.get(url, body, {
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer '+token
    }
  }).catch(err => `Error: ${err}`)
}


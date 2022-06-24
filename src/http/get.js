import axios from 'axios'

import { getData } from '../utils'

export default async (url) => {
  const token = await getData('token')
  const resp = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    }
  }).then(resp => resp.data)
    .catch(err => err.response)
  
  console.log(resp)

  // TODO: If token expired refresh then request again
  if (resp == '') {
    // TODO: Refresh token

    const token = await getData('token')
    resp = axios.get(url, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      }
    }).then(resp => resp.data)
      .catch(err => err.response)
  }
  return resp
}
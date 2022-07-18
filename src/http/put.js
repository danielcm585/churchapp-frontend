import axios from 'axios'

import config from '@root/config'
import { getData, refreshAuth } from '@root/utils'

export default async (url, body) => {
  const execute = async () => {
    const token = await getData('token')
    const data = JSON.stringify(body)

    return await axios.create({
      baseURL: config.API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      validateStatus: (stat) => true
    }).put(url, data)
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

  let resp = await execute()
  if (resp.data == 'Token expired') {
    refreshAuth()
    resp = await execute()
  }
  return resp
}
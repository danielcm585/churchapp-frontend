import { getData } from '../utils'

export default async (url) => {
  try {
    const token = await getData('token')
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const json = await resp.json()
    return json
  }
  catch (err) {
    return err
  }
}
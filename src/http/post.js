import { getData } from '../utils'

export default async (url, body) => {
  try {
    const token = await getData('token')
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    const json = resp.json()
    return json
  }
  catch (err) {
    return err
  }
}
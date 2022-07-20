import { post } from '@root/http'
import { setData, getData } from '@root/utils'

export default async () => {
  const refreshToken = await getData('refreshToken')
  const refresh = await post('/user/refresh', {
    token: refreshToken
  })
  await setData('token', refresh.data.token)
}
import { post } from "../http/"
import { setData, getData } from "./"

export default async () => {
  const refreshToken = await getData('refreshToken')
  const refresh = await post('/user/refresh', {
    token: refreshToken
  })
  await setData('token', refresh.data.token)
}
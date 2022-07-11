import React, { useState } from 'react'

import { RegisterPage1, RegisterPage2 } from '../components/register'

export default function LoginScreen({ navigation }) {
  const [ page, setPage ] = useState(0)
  const [ token, setToken ] = useState()
  const [ refreshToken, setRefreshToken ] = useState()

  return (
    <>
      {
        (page == 0) ? 
          <RegisterPage1 navigation={navigation} setPage={setPage} setToken={setToken} setRefreshToken={setRefreshToken} /> :
          <RegisterPage2 token={token} refreshToken={refreshToken} />
      }
    </>
  )
}

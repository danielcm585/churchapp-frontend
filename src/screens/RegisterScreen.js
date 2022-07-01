import React, { useState } from 'react'

import { RegisterPage1, RegisterPage2 } from '../components/registerscreen'

export default function LoginScreen({ navigation }) {
  const [ page, setPage ] = useState(0)

  return (
    <>
      {
        (page == 0) ? 
          <RegisterPage1 navigation={navigation} setPage={setPage} /> :
          <RegisterPage2 navigation={navigation} />
      }
    </>
  )
}

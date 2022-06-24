import React, { useState } from 'react'

import { RegisterPage1, RegisterPage2 } from '../components/registerscreen'

export default function LoginScreen({ navigation }) {
  const [ page, setPage ] = useState(2)

  return (
    <>
      {
        (page == 1) ? 
          <RegisterPage1 navigation={navigation} setPage={setPage} /> :
          <RegisterPage2 navigation={navigation} />
      }
    </>
  )
}

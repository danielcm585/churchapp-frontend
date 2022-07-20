import React, { useState, useEffect } from 'react'

import { Appbar, Navbar, LoginButton } from '@root/components'

import { Text } from 'native-base'

export default function Stream({ navigation }) {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const getToken = async () => {
    const myToken = await getData('refreshToken')
    setIsLoggedIn(myToken != null || myToken)
  }

  useEffect(async () => {
    await getToken()
  }, [])

  return (
    <>
      <Appbar title='Stream' mainScreen={true} navigation={navigation} />
      {
        !isLoggedIn && <LoginButton navigation={navigation} />
      }
      <Text>
        This feature will be added later
      </Text>
      <Navbar page={2} navigation={navigation} />
    </>
  )
}

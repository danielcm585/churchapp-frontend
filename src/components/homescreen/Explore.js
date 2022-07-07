import React, { useState, useEffect } from 'react'

import { Appbar } from '../'
import { ProfileList } from '../profile'

import { VStack } from 'native-base'
import { get } from '../../http'

export default function Explore({ navigation }) {
  const [ all, setAll ] = useState(null)

  useEffect(async () => {
    try {
      const resp = await get('/user/all')
      if (resp.status >= 400) throw new Error(resp.data)
      setAll(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
    }

    return () => setAll(null)

  })

  return (
    <>
      <Appbar title='Explore' mainScreen={true} />
      <VStack mx='4' mt='2'>
        <ProfileList profiles={all} navigation={navigation} />
      </VStack>
    </>
  )
}

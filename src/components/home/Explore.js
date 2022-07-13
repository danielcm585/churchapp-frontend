import React, { useState, useEffect } from 'react'

import { get } from '../../http'

import { Appbar } from '../'
import { ProfileList } from '../profile'

import { useToast } from 'native-base'
import { VStack } from 'native-base'

export default function Explore({ navigation }) {
  const [ all, setAll ] = useState(null)

  const toast = useToast()
  
  useEffect(async () => {
    try {
      const resp = await get('/user/')
      if (resp.status >= 400) throw new Error(resp.data)
      setAll(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => setAll(null)

  })

  return (
    <>
      <Appbar title='Explore' mainScreen={true} navigation={navigation} />
      <VStack mx='4' mt='2'>
        <ProfileList profiles={all} navigation={navigation} />
      </VStack>
    </>
  )
}

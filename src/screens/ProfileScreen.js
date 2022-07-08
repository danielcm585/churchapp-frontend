import React, { useEffect, useState } from 'react'

import { useToast } from 'native-base'
import { Appbar, ChatInput } from '../components'

export default function ProfileScreen({ route, navigation }) {
  const { profileId } = route.params
  
  const toast = useToast()
  const [ profile, setProfile ] = useState(null)

  useEffect(async () => {
    try {
      const resp = await get(`/user/${profileId}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setProfile(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
    }

    return () => setProfile(null)

  })

  if (profile == null) return <></>

  const [ body, setBody ] = useState('')

  return (
    <>
      <Appbar title={profile.name} profile={profile} navigation={navigation} />
      
      <ChatInput body={body} setBody={setBody} />
    </>
  )
}

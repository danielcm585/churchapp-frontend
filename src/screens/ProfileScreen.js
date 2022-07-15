import React, { useEffect, useState } from 'react'

import { get } from '../http'

import { Appbar, ChatInput } from '../components'
import { AppbarSkeleton } from '../components/skeletons'

import { useToast } from 'native-base'

export default function ProfileScreen({ route, navigation }) {
  const { id } = route.params
  
  const [ profile, setProfile ] = useState(null)

  const toast = useToast()
  
  useEffect(async () => {
    try {
      const resp = await get(`/user/${id}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setProfile(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => setProfile(null)

  }, [])

  const [ body, setBody ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const onSend = async () => {
    try {
      setIsLoading(true)
      const resp = await post() // TODO: Complete me!
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      setBody('')
    }
    catch (err) {
      setIsLoading(false)
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }

  return (
    <>
      {
        (profile != null) ? 
          <Appbar title={profile.name} profile={profile} navigation={navigation} /> :
          <AppbarSkeleton navigation={navigation} />
      }
      
      <ChatInput body={body} setBody={setBody} onSend={onSend} isLoading={isLoading} />
    </>
  )
}

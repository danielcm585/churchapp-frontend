import React, { useEffect, useState } from 'react'

import { get } from '../http'

import { Appbar, ChatInput } from '../components'
import { AppbarSkeleton } from '../components/skeletons'

import { useToast } from 'native-base'

export default function GroupScreen({ route, navigation }) {
  const { groupId } = route.params

  const [ group, setGroup ] = useState(null)
  
  const toast = useToast()

  useEffect(async () => {
    try {
      const resp = await get(`/group/${groupId}`)
      // console.log(resp)
      if (resp.status >= 400) throw new Error(resp.data)
      setGroup(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => setGroup(null)

  }, [])

  const [ body, setBody ] = useState('')
  const [ isLoading, setIsloading ] = useState(false)
  
  const onSend = async () => {
    try {
      setIsloading(true)
      const resp = await post(`/post/${groupId}`, { // TODO: Check me!
        body: body
      }) 
      if (resp.status >= 400) throw new Error(resp.data) 
      setIsloading(false)
      setBody('')
    }
    catch (err) {
      setIsloading(false)
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }

  return (
    <>
      {
        (group != null) ? 
          <Appbar title={group.name} group={group} navigation={navigation} /> :
          <AppbarSkeleton navigation={navigation} />
      }
      <ChatInput body={body} setBody={setBody} onSend={onSend} isLoading={isLoading} />
    </>
  )
}

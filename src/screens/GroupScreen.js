import React, { useEffect, useState } from 'react'

import { Appbar, ChatInput } from '../components'

import { useToast } from 'native-base'
import { get } from '../http'

export default function GroupScreen({ route, navigation }) {
  const { groupId } = route.params

  const [ group, setGroup ] = useState(null)
  const toast = useToast()
  
  useEffect(async () => {
    try {
      const resp = await get(`/group/${groupId}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setGroup(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
    }

    return () => setGroup(null)

  }, [])

  if (group == null) return <GroupScreenSkeleton />

  const [ body, setBody ] = useState('')
  const onSend = () => {
    // TODO: Send message
  }

  return (
    <>
      <Appbar title={group.name} group={group} navigation={navigation} />
      <ChatInput body={body} setBody={setBody} onSend={onSend} />
    </>
  )
}

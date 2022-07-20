import React, { useEffect, useState } from 'react'

import { get, post } from '@root/http'

import { Appbar, ChatInput, Tabs } from '@root/components'
import { PostList } from '@root/components/post'
import { AppbarSkeleton } from '@root/components/skeletons'

import { useToast } from 'native-base'

export default function GroupChatScreen({ route, navigation }) {
  const { id } = route.params

  const pages = [ 'Chats', 'Pinned' ]
  const [ page, setPage ] = useState(0)

  const [ group, setGroup ] = useState(null)
  const [ chats, setChats ] = useState(null)
  const [ pinned, setPinned ] = useState(null)
  
  const toast = useToast()

  useEffect(async () => {
    try {
      const resp = await get(`/group/${id}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setGroup(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    try {
      const resp = await get(`/post/all/${id}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setChats(resp.data.posts)
      setPinned(resp.data.pinned)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => {
      setGroup(null)
      setChats(null)
      setPinned(null)
    }

  }, [])

  const [ body, setBody ] = useState('')
  const [ isLoading, setIsloading ] = useState(false)
  
  const onSend = async () => {
    try {
      setIsloading(true)
      const resp = await post(`/post/${id}`, {
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
      <Tabs pages={pages} page={page} setPage={setPage} />
      {
        (page === 0) ? 
          <PostList posts={chats} reverse={true} /> : 
          <PostList posts={pinned} reverse={true} />
      }
      <ChatInput body={body} setBody={setBody} onSend={onSend} isLoading={isLoading} />
    </>
  )
}

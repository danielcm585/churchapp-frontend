import React, { useEffect, useState } from 'react'

import theme from '../../../theme'
import config from '../../../config'
import { get } from '../../http'

import { Appbar, Tabs } from '../'
import { PostList, NewPostModal } from '../post'
import { EventList } from '../event'

import { useToast } from 'native-base'
import { Fab, Icon } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function Home() {
  const pages = [ 'Events', 'Posts' ]
  const [ page, setPage ] = useState(0)

  const [ posts, setPosts ] = useState(null)
  const [ events, setEvents ] = useState(null)

  const [ openNewPost, setOpenNewPost ] = useState(false)

  const toast = useToast()
  useEffect(async () => {
    try {
      const resp = await get(`/post/${config.MAIN_GROUP_ID}`)
      if (resp.status >= 400) throw new Error('Failed to load posts')
      setPosts(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
    }
    
    try {
      const resp = {
        data: [
          {
            
          }
        ]
      }
      if (resp.status >= 400) throw new Error('Failed to load events')
      setEvents(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
      
    }
    
    return () => {
      setPosts(null)
      setEvents(null)
    }

  }, [])

  return (
    <>
      <Appbar title='Home' mainScreen={true} />
      <Tabs pages={pages} page={page} setPage={setPage} />
      {
        (page === 0) ?
        <EventList events={events} /> :
        <PostList posts={posts} />
      }
      <NewPostModal isOpen={openNewPost} setIsOpen={setOpenNewPost} />
      <Fab mb='57' size='lg' shadow={4} bgColor={theme.blue[500]} onPress={() => setOpenNewPost(true)}
        icon={<Icon as={MaterialIcons} name='add' />} renderInPortal={false} />
    </>
  )
}

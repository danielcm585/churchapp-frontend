import React, { useEffect, useState } from 'react'

import theme from '../../theme'
import { get } from '../http'

import { Appbar, Tabs } from '../components'
import { PostList, NewPostModal } from '../components/post'
import { EventList } from '../components/event'

import { useToast } from 'native-base'
import { Fab, Icon } from 'native-base'
import { MaterialIcons } from '@native-base/icons'
import { Navbar } from '../components'

export default function HomeScreen({ navigation }) {
  const pages = [ 'Events', 'Posts' ]
  const [ page, setPage ] = useState(0)

  const [ posts, setPosts ] = useState(null)
  const [ events, setEvents ] = useState(null)

  const [ openNewPost, setOpenNewPost ] = useState(false)

  const toast = useToast()
  
  useEffect(async () => {
    try {
      const resp = await get(`/post/all`)
      if (resp.status >= 400) throw new Error('Failed to load posts')
      const allPosts = resp.data.reverse()
      setPosts(allPosts)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
    
    return () => {
      setPosts(null)
      setEvents(null)
    }

  }, [])

  return (
    <>
      <Appbar title='Home' mainScreen={true} navigation={navigation} />
      <Tabs pages={pages} page={page} setPage={setPage} />
      {
        (page === 0) ?
        <EventList events={events} /> :
        <PostList posts={posts} navigation={navigation} />
      }
      <NewPostModal isOpen={openNewPost} setIsOpen={setOpenNewPost} />
      <Fab mb='85' size='lg' shadow={4} bgColor={theme.blue[500]} onPress={() => setOpenNewPost(true)}
        icon={<Icon as={MaterialIcons} name='add' />} renderInPortal={false} />
      <Navbar page={0} navigation={navigation} />
    </>
  )
}

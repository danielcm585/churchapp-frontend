import React, { useEffect, useState } from 'react'

import theme from '@root/theme'
import { get } from '@root/http'

import { Navbar, Appbar, Tabs, LoginButton } from '@root/components'
import { PostList, NewPostModal } from '@root/components/post'

import { useToast } from 'native-base'
import { Fab, Icon } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function HomeScreen({ navigation }) {
  const pages = [ 'Events', 'Posts' ]
  const [ page, setPage ] = useState(0)

  const [ posts, setPosts ] = useState(null)
  const [ events, setEvents ] = useState(null)

  const [ openNewPost, setOpenNewPost ] = useState(false)

  const toast = useToast()

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const getToken = async () => {
    const myToken = await getData('refreshToken')
    setIsLoggedIn(myToken != null || myToken)
  }
  
  const getPosts = async () => {
    try {
      setPosts(null)
      setEvents(null)
      const resp = await get(`/post/all`)
      if (resp.status >= 400) throw new Error('Failed to load posts')
      const allPosts = resp.data.posts.reverse()
      const allEvents = resp.data.pinned.reverse()
      setPosts(allPosts)
      setEvents(allEvents)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }

  useEffect(async () => {
    await getToken()
    await getPosts()
    
    return () => {
      setPosts(null)
      setEvents(null)
    }

  }, [])

  return (
    <>
      <Appbar title='Home' mainScreen={true} navigation={navigation} />
      {
        !isLoggedIn && <LoginButton navigation={navigation} />
      }
      <Tabs pages={pages} page={page} setPage={setPage} />
      {
        (page === 0) ?
          <PostList posts={events} navigation={navigation} refresh={getPosts} /> :
          <PostList posts={posts} navigation={navigation} refresh={getPosts} />
      }
      <NewPostModal isOpen={openNewPost} setIsOpen={setOpenNewPost} />
      <Fab mb='85' size='lg' shadow={4} bgColor={theme.blue[500]} onPress={() => setOpenNewPost(true)}
        icon={<Icon as={MaterialIcons} name='add' />} renderInPortal={false} />
      <Navbar page={0} navigation={navigation} />
    </>
  )
}

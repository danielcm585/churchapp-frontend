import React, { useEffect, useState } from 'react'

import theme from '../../../theme'
import { get } from '../../http'
import { API_URL, MAIN_GROUP_ID } from '../../../config'

import { Appbar, Tabs } from '../'
import { PostList } from '../post'
import { EventList } from '../event'

import { HStack, Link, Text } from 'native-base'

export default function Home() {
  const pages = [ 'Events', 'Posts' ]
  const [ page, setPage ] = useState(0)

  const [ posts, setPosts ] = useState()
  const [ events, setEvents ] = useState()

  useEffect(async () => {
    // const allPosts = await get(`${API_URL}/posts/${MAIN_GROUP_ID}/`)
    // const allEvents = await get(`${API_URL}/events/${MAIN_GROUP_ID}/`)
    const allPosts = [
      {
        creator: {
          name: 'Daniel Christian Mandolang',
          photo: 'https://i.ibb.co/B2cSS4q/download.png'
        },
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        createdAt: '',
        editedAt: ''
      },
      {
        creator: {
          name: 'Daniel Christian Mandolang',
          photo: 'https://i.ibb.co/B2cSS4q/download.png'
        },
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        createdAt: '',
        editedAt: ''
      },
      {
        creator: {
          name: 'Daniel Christian Mandolang',
          photo: 'https://i.ibb.co/B2cSS4q/download.png'
        },
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        createdAt: '',
        editedAt: ''
      },
    ]
    const allEvents = [
      {

      }
    ]
    setPosts(allPosts)
    setEvents(allEvents)
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
    </>
  )
}

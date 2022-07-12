import React, { useState, useEffect } from 'react'

import { get } from '../http'
import { setData } from '../utils'

import { Navbar } from '../components'
import { Home, Explore, Stream, Groups, Profile } from '../components/home'

import { useToast } from 'native-base'

export default function HomeScreen({ navigation }) {
  const [ page, setPage ] = useState(1)

  const [ user, setUser ] = useState(null)

  const toast = useToast()

  useEffect(async () => {
    try {
      const resp = await get('/user/me')
      if (resp.status >= 400) throw new Error(resp.data)
      // console.log(resp)
      const me = resp.data
      await setData('user', JSON.stringify(me))
      setUser(me)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => setUser(null)

  }, [])

  return (
    <>
      {
        (page === 1) ? <Home navigation={navigation} /> :
        (page === 2) ? <Explore navigation={navigation} /> :
        (page === 3) ? <Stream /> :
        (page === 4) ? <Groups navigation={navigation} /> :
        <Profile navigation={navigation} user={user} setUser={setUser} />
      }
      <Navbar page={page} setPage={setPage} />
    </>
  )
}

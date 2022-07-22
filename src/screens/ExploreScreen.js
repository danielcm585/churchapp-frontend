import React, { useState, useEffect } from 'react'

import { get } from '@root/http'

import { Appbar, Navbar, LoginButton, Tabs } from '@root/components'
import { ProfileList } from '@root/components/profile'

import { useToast } from 'native-base'
import { VStack } from 'native-base'

export default function ExploreScreen({ navigation }) {
  const pages = [ 'Search', 'Directs' ]
  const [ page, setPage ] = useState(0)

  const [ all, setAll ] = useState(null)
  const [ directs, setDirects ] = useState(null)

  const toast = useToast()

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const getToken = async () => {
    const myToken = await getData('refreshToken')
    setIsLoggedIn(myToken != null || myToken)
  }

  const getUsers = async () => {
    try {
      setAll(null)
      const resp = await get('/user/')
      if (resp.status >= 400) throw new Error(resp.data)
      setAll(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }
  
  const getDirects = async () => {
    try {
      setDirects(null)
      // TODO: Fetch my directs
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })    
    }
  }

  const refreshUsers = async () => {
    await getToken()
    await getUsers()
  }

  const refreshDirects = async () => {
    await getToken()
    if (!isLoggedIn) await getDirects()
  }
  
  useEffect(async () => {
    await getToken()
    await getUsers()
    if (!isLoggedIn) await getDirects()
    return () => setAll(null)
  }, [])

  return (
    <>
      <Appbar title='Explore' mainScreen={true} navigation={navigation} />
      {
        !isLoggedIn && <LoginButton navigation={navigation} />
      }
      <Tabs pages={pages} page={page} setPage={setPage} />
      <VStack mx='4'>
        {
          (page == 0) ? 
            <ProfileList profiles={all} navigation={navigation} refresh={refreshUsers} /> :
            <ProfileList profiles={directs} navigation={navigation} refresh={refreshDirects} />
        }
      </VStack>
      <Navbar page={1} navigation={navigation} />
    </>
  )
}

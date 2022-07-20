import React, { useEffect, useState } from 'react'

import theme from '@root/theme'
import { get } from '@root/http'
import { getData } from '@root/utils'

import { Appbar, Tabs, LoginButton, Navbar } from '@root/components'
import { GroupList, NewGroupModal } from '@root/components/group'

import { useToast } from 'native-base'
import { Fab, Icon } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function GroupsScreen({ navigation }) {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const getToken = async () => {
    const myToken = await getData('refreshToken')
    setIsLoggedIn(myToken != null || myToken)
  }

  const pages = [ 'My Groups', 'All Groups' ]
  const [ page, setPage ] = useState(0)

  const [ myGroups, setMyGroups ] = useState(null)
  const [ allGroups, setAllGroups ] = useState(null)

  const toast = useToast()
  
  useEffect(async () => {
    await getToken()

    try {
      const resp = await get('/group/')
      if (resp.status >= 400) throw new Error(resp.data)
      setAllGroups(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => {
      setAllGroups(null)
      setMyGroups(null)
    }

  }, [])

  useEffect(async () => {
    if (!isLoggedIn) {
      setPage(1)
      return
    }

    setPage(0)
    try {
      const resp = await get('/group/mine')
      if (resp.status >= 400) throw new Error(resp.data) 
      setMyGroups(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }, [ isLoggedIn ])

  const [ openNewGroup, setOpenNewGroup ] = useState(false)

  return (
    <>
      <Appbar title='Groups' mainScreen={true} navigation={navigation} />
      {
        !isLoggedIn && <LoginButton navigation={navigation} />
      }
      <Tabs pages={pages} page={page} setPage={setPage} />
      {
        (page === 0) ? 
          <GroupList groups={myGroups} mine={true} navigation={navigation} /> :
          <GroupList groups={allGroups} navigation={navigation} /> 
      }
      <NewGroupModal isOpen={openNewGroup} setIsOpen={setOpenNewGroup} />
      <Fab mb='85' size='lg' shadow={4} bgColor={theme.blue[500]} onPress={() => setOpenNewGroup(true)}
        icon={<Icon as={MaterialIcons} name='add' />} renderInPortal={false} />
      <Navbar page={3} navigation={navigation} />
    </>
  )
}

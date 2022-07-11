import React, { useEffect, useState } from 'react'

import theme from '../../../theme'
import { get } from '../../http'

import { Appbar, Tabs } from '../'
import { GroupList, NewGroupModal } from '../group'

import { useToast } from 'native-base'
import { Fab, Icon } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function Groups({ navigation }) {
  const pages = [ 'My Groups', 'All Groups' ]
  const [ page, setPage ] = useState(0)

  const [ myGroups, setMyGroups ] = useState(null)
  const [ allGroups, setAllGroups ] = useState(null)

  const toast = useToast()
  
  useEffect(async () => {
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

    return () => {
      setAllGroups(null)
      setMyGroups(null)
    }

  }, [])

  const [ openNewGroup, setOpenNewGroup ] = useState(false)

  return (
    <>
      <Appbar title='Groups' mainScreen={true} />
      <Tabs pages={pages} page={page} setPage={setPage} />
      {
        (page === 0) ? 
          <GroupList groups={myGroups} mine={true} navigation={navigation} /> :
          <GroupList groups={allGroups} mine={false} navigation={navigation} /> 
      }
      <NewGroupModal isOpen={openNewGroup} setIsOpen={setOpenNewGroup} />
      <Fab mb='57' size='lg' shadow={4} bgColor={theme.blue[500]} onPress={() => setOpenNewGroup(true)}
        icon={<Icon as={MaterialIcons} name='add' />} renderInPortal={false} />
    </>
  )
}

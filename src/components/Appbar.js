import React, { useState } from 'react'

import theme from '../../theme'
import { post, del } from '../http'

import { EditGroupModal, InviteModal } from './group'
import { DangerWarning } from './'

import { useToast } from 'native-base'
import { Box, HStack, IconButton, Icon, Text, StatusBar, Link, Menu, Divider } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function Appbar({ title, mainScreen, group, profile, navigation }) {
  const [ openInvite, setOpenInvite ] = useState(false)
  const [ openEditGroup, setOpenEditGroup ] = useState(false)
  const [ openLeaveGroup, setOpenLeaveGroup ] = useState(false)
  const [ openDeleteGroup, setOpenDeleteGroup ] = useState(false)

  const toast = useToast()

  const [ isLoading, setIsLoading ] = useState(false)

  const leaveGroup = async () => {
    try {
      setIsLoading(true)
      const resp = await post(`/group/leave/${group._id}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      navigation.navigate('Home')
    }
    catch (err) {
      setIsLoading(false)
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }
  
  const deleteGroup = async () => {
    try {
      setIsLoading(true)
      const resp = await del(`/group/${group._id}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      navigation.navigate('Home')
    }
    catch (err) {
      setIsLoading(false)
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }
  
  const reportGroup = async () => {
    
  }
  
  const reportUser = () => {
    
  }
  
  return (
    <>
      {
        (group != null) && (
          <>
            <InviteModal isOpen={openInvite} setIsOpen={setOpenInvite} />
            <EditGroupModal group={group} isOpen={openEditGroup} setIsOpen={setOpenEditGroup} />
            <DangerWarning isLoading={isLoading} isOpen={openLeaveGroup} setIsOpen={setOpenLeaveGroup} 
              title='Leave Group' action='Leave' onContinue={leaveGroup} />
            <DangerWarning isLoading={isLoading} isOpen={openDeleteGroup} setIsOpen={setOpenDeleteGroup} 
              title='Delete Group' action='Delete' onContinue={deleteGroup} />
          </>
        )
      }
      <StatusBar bg='#3700B3' barStyle='light-content' />
      <Box safeAreaTop bg={theme.blue[300]} />
      <HStack bg='white' px='1' py='1' justifyContent='space-between' alignItems='center' w='100%'>
        {
          mainScreen ? (
            <IconButton icon={<Icon size='md' as={MaterialIcons} name='menu' color='black' />} />
          ) : (
            <IconButton icon={<Icon size='md' as={MaterialIcons} name='arrow-back' color='black' />}
              onPress={() => navigation.goBack()}
            />
          )
        }
        {
          (group != null || profile != null) ? (
            <>
              {
                (group != null) && (
                  <Link onPress={() => navigation.navigate('GroupDetails', { id: group._id })}>
                    <Text bold color='black' fontSize='lg' maxW='300' isTruncated>{title}</Text>
                  </Link>
                )
              }
              {
                (profile != null) && (
                  <Link onPress={() => navigation.navigate('ProfileDetails', { id: profile._id })}>
                    <Text bold color='black' fontSize='lg' maxW='300' isTruncated>{title}</Text>
                  </Link>
                )
              }
            </>
          ) : (
            <Text bold color='black' fontSize='lg' maxW='300' isTruncated>{title}</Text>
          )
        }
        {
          mainScreen ? (
            <IconButton icon={<Icon as={MaterialCommunityIcons} name='bell' size='md' color='black' />}
              onPress={() => navigation.navigate('Notification')} />
          ) : (
            <Menu closeOnSelect={false} trigger={triggerProps => <IconButton {...triggerProps} 
              icon={<Icon as={MaterialCommunityIcons} name='dots-vertical' size='md' color='black' />} 
            />}>
              {
                (group != null) ? (
                  <>
                    <Menu.Item key={0} onPress={() => setOpenInvite(true)}>
                      <Text>Invite Member</Text>
                    </Menu.Item>
                    <Menu.Item key={1} onPress={() => setOpenEditGroup(true)}>
                      <Text>Edit Group</Text>
                    </Menu.Item>
                    <Menu.Item key={2}>
                      <Text>Mute Notification</Text>
                    </Menu.Item>
                    <Divider my='2' />
                    <Menu.Item key={3} onPress={reportGroup}>
                      <Text color='red.500'>Report Group</Text>
                    </Menu.Item>
                    <Menu.Item key={4} onPress={leaveGroup}>
                      <Text color='red.500'>Leave Group</Text>
                    </Menu.Item>
                    <Menu.Item key={5} onPress={deleteGroup}>
                      <Text color='red.500'>Delete Group</Text>
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    {
                      (profile != null) ? (
                        <Menu.Item key={0} onPress={reportUser}>
                          <Text color='red.500'>Report User</Text>
                        </Menu.Item>
                      ) : (
                        <>
                          
                        </>
                      )
                    }
                  </>
                )
              }
            </Menu>
          )
        }
      </HStack>
    </>
  )
}

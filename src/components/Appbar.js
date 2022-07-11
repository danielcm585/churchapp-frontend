import React, { useState } from 'react'

import { EditGroupModal, InviteModal } from './group'
import { DangerWarning } from './'

import { Box, HStack, IconButton, Icon, Text, StatusBar, Link, Menu, Divider } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function Appbar({ title, mainScreen, group, profile, loading, navigation }) {
  if (loading) return <AppbarSkeleton />

  const [ openInvite, setOpenInvite ] = useState(false)
  const [ openEditGroup, setOpenEditGroup ] = useState(false)
  const [ openLeaveGroup, setOpenLeaveGroup ] = useState(false)
  const [ openDeleteGroup, setOpenDeleteGroup ] = useState(false)

  const leaveGroup = () => {

  }

  const deleteGroup = () => {

  }

  return (
    <>
      {
        (group != null) && (
          <>
            <InviteModal isOpen={openInvite} setIsOpen={setOpenInvite} />
            <EditGroupModal group={group} isOpen={openEditGroup} setIsOpen={setOpenEditGroup} />
            <DangerWarning isOpen={openLeaveGroup} setIsOpen={setOpenLeaveGroup} 
              title='Leave Group' action='Leave' onContinue={leaveGroup} />
            <DangerWarning isOpen={openDeleteGroup} setIsOpen={setOpenDeleteGroup} 
              title='Delete Group' action='Delete' onContinue={deleteGroup} />
          </>
        )
      }
      <StatusBar bg='#3700B3' barStyle='light-content' />
      <Box safeAreaTop bg='#6200ee' />
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
                  <Link onPress={() => navigation.navigate('GroupDetails', { groupId: group._id })}>
                    <Text bold color='black' fontSize='lg' maxW='300' isTruncated>{title}</Text>
                  </Link>
                )
              }
              {
                (profile != null) && (
                  <Link onPress={() => navigation.navigate('ProfileDetails', { profileId: profile._id })}>
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
            <IconButton icon={<Icon as={MaterialCommunityIcons} name='bell' size='md' color='black' />} />
          ) : (
            <>
              {
                (group != null) && (
                  <>
                    <Menu closeOnSelect={false} trigger={triggerProps => <IconButton {...triggerProps} 
                      icon={<Icon as={MaterialCommunityIcons} name='dots-vertical' size='md' color='black' />} 
                    />}>
                      <Menu.Item onPress={() => setOpenInvite(true)}>
                        <Text>Invite Member</Text>
                      </Menu.Item>
                      <Menu.Item onPress={() => setOpenEditGroup(true)}>
                        <Text>Edit Group</Text>
                      </Menu.Item>
                      <Menu.Item>
                        <Text>Mute Notification</Text>
                      </Menu.Item>
                      <Divider my='2' />
                      <Menu.Item onPress={() => setOpenLeaveGroup(true)}>
                        <Text color='red.500'>Leave Group</Text>
                      </Menu.Item>
                      <Menu.Item onPress={() => setOpenDeleteGroup(true)}>
                        <Text color='red.500'>Delete Group</Text>
                      </Menu.Item>
                    </Menu>
                  </>
                )
              }
              {
                (profile != null) && (
                  <>
                    <Menu closeOnSelect={false} trigger={triggerProps => <IconButton {...triggerProps} 
                      icon={<Icon as={MaterialCommunityIcons} name='dots-vertical' size='md' color='black' />} 
                    />}>
                      <Menu.Item>
                        <Text color='red.500'>Report User</Text>
                      </Menu.Item>
                    </Menu>
                  </>
                )
              }
            </>
          )
        }
      </HStack>
    </>
  )
}

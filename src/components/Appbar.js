import React, { useState } from 'react'

import { InviteModal } from './groupscreen'

import { Box, HStack, IconButton, Icon, Text, StatusBar, Link, Menu, Divider } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function Appbar({ title, mainScreen, group, navigation }) {
  const [ openInvite, setOpenInvite ] = useState(false)

  return (
    <>
      {
        (group != null) && 
          <InviteModal isOpen={openInvite} setIsOpen={setOpenInvite} />
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
          (group != null) ? (
            <Link onPress={() => navigation.navigate('GroupDetails', { group: group })}>
              <Text bold color='black' fontSize='lg'>{title}</Text>
            </Link>
          ) : (
            <Text bold color='black' fontSize='lg'>{title}</Text>
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
                      <Menu.Item>
                        <Text>Edit Group</Text>
                      </Menu.Item>
                      <Menu.Item>
                        <Text>Mute Notification</Text>
                      </Menu.Item>
                      <Divider my='2' />
                      <Menu.Item>
                        <Text color='red.500'>Leave Group</Text>
                      </Menu.Item>
                      <Menu.Item>
                        <Text color='red.500'>Delete Group</Text>
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

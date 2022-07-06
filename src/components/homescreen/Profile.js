import React, { useEffect, useState } from 'react'
import { DevSettings } from 'react-native'

import { getData, removeData, setData } from '../../utils'
import { get } from '../../http'

import { Appbar } from '../'
import { ChangePasswordModal, ContactUsModal, EditProfileModal, ProfileDetails } from '../profile'
import { DangerWarning } from '../'

import { useToast } from 'native-base'
import { VStack, Text, Button, Divider, Icon } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function Profile({ navigation }) {
  const [ user, setUser ] = useState(null)
  
  const toast = useToast()
  useEffect(async () => {
    try {
      const resp = await get('/user/')
      if (resp.status >= 400) throw new Error(resp.data)
      const me = resp.data
      await setData('user', JSON.stringify(me))
      setUser(me)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
    }

    return () => setUser(null)

  }, [])

  const [ openEditProfile, setOpenEditProfile ] = useState(false)
  const [ openChangePassword, setOpenChangePassword ] = useState(false)
  const [ openContactUs, setOpenContactUs ] = useState(false)
  const [ openLogout, setOpenLogout ] = useState(false)

  const logout = async () => {
    await removeData('token')
    await removeData('refreshToken')
    await removeData('user')
    DevSettings.reload()
  }

  return (
    <>
      <Appbar title='Profile' mainScreen={true} />
      <ProfileDetails user={user} />
      <VStack mx='4' mt='3'>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialIcons} name='attach-money' color='black' />}
          onPress={() => console.log('TODO')}>
          <Text>Offering</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialCommunityIcons} name='hands-pray' color='black' />}
          onPress={() => console.log('TODO')}>
          <Text>Prayer Request</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialIcons} name='edit' color='black' />}
          onPress={() => setOpenEditProfile(true)}>
          <Text>Edit Profile</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialCommunityIcons} name='key-change' color='black' />}
          onPress={() => setOpenChangePassword(true)}>
          <Text>Change Password</Text>
        </Button>
        <Divider mt='4' />
        <Button mt='4' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialIcons} name='phone' color='black' />}
          onPress={() => setOpenContactUs(true)}>
          <Text>Contact Us</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='gray.100' _pressed={{ bgColor: 'gray.200' }}
          leftIcon={<Icon as={MaterialCommunityIcons} name='google' color='black' />}
          onPress={() => console.log('TODO')}>
          <Text>Connect Google</Text>
        </Button>
        <Button mt='1' variant='outline' rounded='md' bgColor='red.500' _pressed={{ bgColor: 'red.600' }}
          leftIcon={<Icon as={MaterialCommunityIcons} name='logout' color='white' />}
          onPress={() => setOpenLogout(true)}>
          <Text color='white'>Logout</Text>
        </Button>
      </VStack>
      {
        (user != null) && (
          <>
            <EditProfileModal profile={user} isOpen={openEditProfile} setIsOpen={setOpenEditProfile} />
            <ChangePasswordModal profile={user} isOpen={openChangePassword} setIsOpen={setOpenChangePassword} />
            <ContactUsModal isOpen={openContactUs} setIsOpen={setOpenContactUs} />
            <DangerWarning title='Logout' action='Logout' onContinue={logout} 
              isOpen={openLogout} setIsOpen={setOpenLogout} />
          </>
        )
      }
    </>
  )
}

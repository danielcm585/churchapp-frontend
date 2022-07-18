import React, { useState, useEffect } from 'react'
import { DevSettings } from 'react-native'

import { getData, setData, removeData } from '@root/utils'
import { post, get } from '@root/http'

import { ChangePasswordModal, ContactUsModal, EditProfileModal, GuestDetails, ProfileDetails } from '@root/components/profile'
import { Appbar, Navbar, LoginButton, DangerWarning } from '@root/components'

import { useToast } from 'native-base'
import { VStack, Text, Button, Divider, Icon } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function ProfileScreen({ navigation }) {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const getToken = async () => {
    const myToken = await getData('refreshToken')
    if (myToken != null) setIsLoggedIn(true)
  }

  const [ openEditProfile, setOpenEditProfile ] = useState(false)
  const [ openChangePassword, setOpenChangePassword ] = useState(false)
  const [ openContactUs, setOpenContactUs ] = useState(false)
  const [ openLogout, setOpenLogout ] = useState(false)

  const [ user, setUser ] = useState(null)

  const toast = useToast()
  
  useEffect(async () => {
    getToken()

    try {
      const resp = await get('/user/me')
      if (resp.status >= 400) throw new Error(resp.data)
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

  const logout = async () => {
    try {
      const refreshToken = await getData('refreshToken')
      const resp = await post('/user/logout', {
        token: refreshToken
      })
      if (resp.status >= 400) throw new Error(resp.data)
      await removeData('token')
      await removeData('refreshToken')
      await removeData('user')
      DevSettings.reload()
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }

  return (
    <>
      <Appbar title='Profile' mainScreen={true} navigation={navigation} />
      {
        isLoggedIn ? (
          <>
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
                </>
              )
            }
            <ContactUsModal isOpen={openContactUs} setIsOpen={setOpenContactUs} />
            <DangerWarning title='Logout' action='Logout' onContinue={logout} 
              isOpen={openLogout} setIsOpen={setOpenLogout} />
          </>
        ) : (
          <>
            <GuestDetails />
            <VStack mt='4'>
              <LoginButton navigation={navigation} />
            </VStack>
          </>
        )
      }
      <Navbar page={4} navigation={navigation} />
    </>
  )
}

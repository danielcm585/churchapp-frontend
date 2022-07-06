import React, { useEffect, useState } from 'react'

import theme from '../../../theme'
import { put } from '../../http'

import { PhotoUpload } from '../'
import { DateInput } from '../'

import { useToast } from 'native-base'
import { Button, Modal, Text, HStack, Icon, Input, Center, Avatar, Select } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function EditProfileModal({ isOpen, setIsOpen, profile }) {
  const onClose = () => setIsOpen(false)

  const [ name, setName ] = useState(profile.name)
  const [ gender, setGender ] = useState(profile.gender)
  const [ phone, setPhone ] = useState(profile.phone)
  const [ email, setEmail ] = useState(profile.email)
  const [ address, setAddress ] = useState(profile.address)
  const [ birth, setBirth ] = useState(new Date(profile.birth))
  const [ photo, setPhoto ] = useState(profile.photo)

  const [ birthDate, setBirthDate ] = useState('')
  const [ birthMonth, setBirthMonth ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')
  
  useEffect(() => {
    const dates = [...Array(31).keys()].map(val => val+1)
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
    const years = [...Array(200).keys()].map(val => val+1950)
    
    const myBirthYear = profile.birth.split('-')[0]
    const myBirthMonth = months[parseInt(profile.birth.split('-')[1]) - 1]
    const myBirthDate = profile.birth.split('-')[2].split('T')[0]

    setBirthDate(myBirthDate)
    setBirthMonth(myBirthMonth)
    setBirthYear(myBirthYear)
    
    return () => {
      setBirthDate('')
      setBirthMonth('')
      setBirthYear('')
    }

  }, [])

  const toast = useToast()
  const [ isLoading, setIsLoading ] = useState(false)

  const validateInput = () => {
    try {
      if (name == null || name.length == 0) throw new Error('Name cannot be empty')
      if (phone == null || phone.length == 0) throw new Error('Phone cannot be empty')
      if (email == null || email.length == 0) throw new Error('Email cannot be empty')
      if (address == null || address.length == 0) throw new Error('Address cannot be empty')
      if (gender == null || gender.length == 0) throw new Error('Gender cannot be empty') 
      return true;
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
      return false
    }
  }

  const editProfile = async () => {
    if (!validateInput()) return
    try {
      setIsLoading(true)
      const resp = await put('/user/', {
        name: name,
        phone: phone,
        email: email,
        address: address,
        gender: gender,
        birth: birth
      })
      if (resp.status >= 400) throw new Error(resp.data)
      setIsLoading(false)
      onClose()
    }
    catch (err) {
      setIsLoading(false)
      toast.show({
        title: err.message,
        placement: 'bottom',
        status: 'error'
      })
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content minW='95%'>
          <Modal.CloseButton />
          <Modal.Header>Edit Profile</Modal.Header>
          <Modal.Body p='4'>
            <Center>
              <Avatar size='xl' source={{ uri: photo }}>-</Avatar>
            </Center>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='person'></Icon>
              <Input w='89%' variant='underlined' placeholder='Full Name' value={name}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setName(val)}
              />
            </HStack>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='phone'></Icon>
              <Input w='89%' variant='underlined' placeholder='Phone Number' value={phone}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setPhone(val)} 
              />
            </HStack>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='email'></Icon>
              <Input w='89%' variant='underlined' placeholder='Email' value={email}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setEmail(val)} 
              />
            </HStack>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='location-pin'></Icon>
              <Input w='89%' variant='underlined' placeholder='Home Address' value={address}
                _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setAddress(val)} 
              />
            </HStack>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='gender-male'></Icon>
              <Select minWidth='30%' selectedValue={gender} placeholder='Gender' onValueChange={val => setGender(val)}>
                <Select.Item label='Male' value='Male' />
                <Select.Item label='Female' value='Female' />
              </Select>
            </HStack>
            <DateInput mt='4' mx='0' date={birthDate} setDate={setBirthDate} month={birthMonth} setMonth={setBirthMonth} year={birthYear} setYear={setBirthYear} setFinalDate={setBirth} />
            <PhotoUpload mt='4' pressedBgColor='gray.100' setLink={setPhoto} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={editProfile}
                isLoading={isLoading} _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Save</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

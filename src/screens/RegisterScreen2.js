import React, { useState } from 'react'
import axios from 'axios'
import * as FileSystem from 'expo-file-system'

import theme from '@root/theme'
import config from '@root/config'
import { put } from '@root/http'

import { PhotoUpload, DateInput, Appbar } from '@root/components'

import { useToast } from 'native-base'
import { Center, Button, HStack, Icon, Input, Text, Select, Avatar, ScrollView } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@native-base/icons'

export default function RegisterPage2({ navigation }) {
  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ address, setAddress ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ birth, setBirth ] = useState(new Date())
  const [ photo, setPhoto ] = useState('https://i.ibb.co/B2cSS4q/download.png')

  const [ birthDate, setBirthDate ] = useState('')
  const [ birthMonth, setBirthMonth ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')

  const [ isLoading, setIsLoading ] = useState(false)
  
  const validateInput = () => {
    if (name == null || name.length == 0) throw new Error('Name cannot be empty')
    if (phone == null || phone.length == 0) throw new Error('Phone cannot be empty')
    if (email == null || email.length == 0) throw new Error('Email cannot be empty')
    if (address == null || address.length == 0) throw new Error('Address cannot be empty')
    if (gender == null || gender.length == 0) throw new Error('Gender cannot be empty')
  }
  
  const toast = useToast()

  const postPhoto = async (photo) => {
    if (photo == null) return null
    let result = null
    const base64 = await FileSystem.readAsStringAsync(photo, { encoding: 'base64' })
    const form = new FormData()
    form.append('image',base64)
    try {
      const resp = await axios.create({
        headers: { },
        validateStatus: (stat) => true
      }).post(config.IMGBB_URL, form)
        .then(resp => resp.data.data)
      result = resp.display_url
    }
    catch(err) {
      toast.show({
        title: err.message,
        placement: 'bottom',
      })
    } 
    return result
  }

  const addData = async () => {
    try {
      setIsLoading(true)
      validateInput()
      const photoLink = await postPhoto(photo)
      const resp = await put('/user/', {
        name: name,
        phone: phone,
        email: email,
        address: address,
        gender: gender,
        birth: birth,
        photo: photoLink
      })
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

  return (
    <>
      <Appbar title='Register' navigation={navigation} />
      <ScrollView>
        <Center mt='12'>
          <Avatar size='2xl' source={{ uri: photo }}>-</Avatar>
        </Center>
        <Text mt='4' ml='6' mr='6'>
          Please fill in the following form, so we can know you personally.
        </Text>
        <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
          <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='person'></Icon>
          <Input w='89%' variant='underlined' placeholder='Full Name' value={name}
            _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setName(val)}
          />
        </HStack>
        <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
          <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='phone'></Icon>
          <Input w='89%' variant='underlined' placeholder='Phone Number' value={phone}
            _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setPhone(val)} 
          />
        </HStack>
        <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
          <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='email'></Icon>
          <Input w='89%' variant='underlined' placeholder='Email' value={email}
            _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setEmail(val)} 
          />
        </HStack>
        <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
          <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='location-pin'></Icon>
          <Input w='89%' variant='underlined' placeholder='Home Address' value={address}
            _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setAddress(val)} 
          />
        </HStack>
        <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
          <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='gender-male'></Icon>
          <Select minWidth='30%' selectedValue={gender} placeholder='Gender' 
            onValueChange={val => setGender(val)}>
            <Select.Item label='Male' value='Male' />
            <Select.Item label='Female' value='Female' />
          </Select>
        </HStack>
        <DateInput mt='4' mx='6' date={birthDate} setDate={setBirthDate} month={birthMonth} 
          setMonth={setBirthMonth} year={birthYear} setYear={setBirthYear} setFinalDate={setBirth} />
        <PhotoUpload mt='4' mx='6' bgColor='gray.100' pressedBgColor='gray.200' setPhoto={setPhoto} />
        <Button mt='4' ml='6' mr='6' borderRadius='lg' backgroundColor={theme.blue[500]}
          _pressed={{ backgroundColor: theme.blue[600] }} onPress={addData} isLoading={isLoading}>
          Register
        </Button>
      </ScrollView>
    </>
  )
}

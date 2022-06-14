import React, { useState } from 'react'

import theme from '../../../theme'
import config from '../../../config'
import { put } from '../../http'

import { Button, Heading, HStack, Icon, Image, Input, IconButton, Text, Link, Select, Avatar, ZStack, VStack } from 'native-base'
import { useToast } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@native-base/icons'

export default function LoginScreen({ navigation, setPage }) {
  const [ show, setShow ] = useState(false)

  const [ name, setName ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ birth, setBirth ] = useState(new Date())
  const [ photo, setPhoto ] = useState('https://i.ibb.co/B2cSS4q/download.png')

  const [ birthDate, setBirthDate ] = useState()
  const [ birthMonth, setBirthMonth ] = useState()
  const [ birthYear, setBirthYear ] = useState()

  const toast = useToast()
  const [ isLoading, setIsLoading ] = useState(false)
  const addData = async () => {
    setIsLoading(true)
    const resp = await put(`${config.API_URL}/user/${id}`, { name, gender, phone, birth, photo })
    console.log(resp)
    if (resp.status >= 400) {
      toast.show({
        title: resp.message,
        placement: 'bottom',
        status: 'error'
      })
      setIsLoading(false)
    }
    else {
      setIsLoading(false)
      setPage(prev => prev+1)
    }
  }

  const dates = [...Array(31).keys()].map(val => val+1)
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  const years = [...Array(200).keys()].map(val => val+1950)

  return (
    <>
      <Heading mt='12' ml='6' size='2xl' color={theme.blue[900]}>Register</Heading>
      <Text mt='4' ml='6' mr='6'>
        Please fill in the following form, so we can know you personally
      </Text>
      <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='person'></Icon>
        <Input w='89%' variant='underlined' placeholder='Full Name' color={theme.blue[900]} 
          _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setName(val)}
        />
      </HStack>
      <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialIcons} name='phone'></Icon>
        <Input w='89%' variant='underlined' placeholder='Phone Number' color={theme.blue[900]}
          _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setPhone(val)} 
        />
      </HStack>
      <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='gender-male'></Icon>
        <Select minWidth='30%' selectedValue={gender} placeholder='Gender' onValueChange={val => setGender(val)}>
          <Select.Item label='Male' value='Male' />
          <Select.Item label='Female' value='Female' />
        </Select>
      </HStack>
      <HStack mt='4' ml='6' mr='6' space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='calendar'></Icon>
        <HStack space='2' alignItems='center'>
          <Select minWidth='25%' selectedValue={birthDate} placeholder='Date' onValueChange={val => {
              setBirthDate(val)
              birth.setDate(parseInt(val))
            }}>
            {
              dates.map(date => <Select.Item label={date.toString()} value={date.toString()} />)
            }
          </Select>
          <Select minWidth='35%' selectedValue={birthMonth} placeholder='Month' onValueChange={val => {
              setBirthMonth(val)
              birth.setMonth(months.findIndex(month => month == val) + 1)
            }}>
            {
              months.map(month => <Select.Item label={month} value={month} />)
            }
          </Select>
          <Select minWidth='29%' selectedValue={birthYear} placeholder='Year' onValueChange={val => {
              setBirthYear(val)
              birth.setFullYear(parseInt(val))
            }}>
            {
              years.map(year => <Select.Item label={year.toString()} value={year.toString()} />)
            }
          </Select>
        </HStack>
      </HStack>
      <Text mt='4' ml='6' mr='6'>
        Customize your profile by adding profile picture
      </Text>
      {/* FIXME: Add file picker */}
      <Button mt='4' ml='6' mr='6' borderRadius='lg' variant='outline' backgroundColor='gray.100'
        _pressed={{ backgroundColor: 'gray.200' }}>
        <Text color='black'>
          Add Photo
        </Text>
      </Button>
      <Text mt='6' ml='6' mr='6'>
        Your profile preview
      </Text>
      <HStack mt='4' alignItems='center'>
        <Avatar ml='6' size='xl' source={{ uri: photo }}>-</Avatar>
        <VStack ml='4'>
          <Text fontSize='lg' fontWeight='bold'>{name}</Text>
          <Text fontSize='md' fontWeight='semibold'>{gender}</Text>
          <Text fontSize='md' fontWeight='semibold'>{phone}</Text>
        </VStack>
      </HStack>
      <Button mt='6' ml='6' mr='6' borderRadius='lg' backgroundColor={theme.blue[500]}
        _pressed={{ backgroundColor: theme.blue[600] }} onPress={addData} isLoading={isLoading}>
        Register
      </Button>
    </>
  )
}

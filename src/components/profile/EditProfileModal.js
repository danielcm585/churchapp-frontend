import React, { useState } from 'react'

import theme from '../../../theme'

import { PhotoUpload } from '../'

import { Button, Modal, Text, HStack, Icon, Input, Center, Avatar, Select } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function EditProfileModal({ isOpen, setIsOpen, profile }) {
  const [ name, setName ] = useState(profile.name)
  const [ gender, setGender ] = useState(profile.gender)
  const [ phone, setPhone ] = useState(profile.phone)
  const [ birth, setBirth ] = useState(profile.birth)
  const [ photo, setPhoto ] = useState(profile.photo)

  const [ birthDate, setBirthDate ] = useState('')
  const [ birthMonth, setBirthMonth ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')

  const dates = [...Array(31).keys()].map(val => val+1)
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  const years = [...Array(200).keys()].map(val => val+1950)

  const editGroup = () => {
    // TODO: PUT changes 
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
              <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='gender-male'></Icon>
              <Select minWidth='30%' selectedValue={gender} placeholder='Gender' onValueChange={val => setGender(val)}>
                <Select.Item label='Male' value='Male' />
                <Select.Item label='Female' value='Female' />
              </Select>
            </HStack>
            <HStack mt='4' space='4' alignItems='center'>
              <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name='calendar'></Icon>
              <HStack space='2' alignItems='center'>
                <Select minWidth='25%' selectedValue={birthDate} placeholder='Date' onValueChange={val => {
                    setBirthDate(val)
                    birth.setDate(parseInt(val))
                  }}>
                  {
                    dates.map((date, idx) => <Select.Item key={idx} label={date.toString()} value={date.toString()} />)
                  }
                </Select>
                <Select minWidth='35%' selectedValue={birthMonth} placeholder='Month' onValueChange={val => {
                    setBirthMonth(val)
                    birth.setMonth(months.findIndex(month => month == val) + 1)
                  }}>
                  {
                    months.map((month, idx) => <Select.Item key={idx} label={month} value={month} />)
                  }
                </Select>
                <Select minWidth='29%' selectedValue={birthYear} placeholder='Year' onValueChange={val => {
                    setBirthYear(val)
                    birth.setFullYear(parseInt(val))
                  }}>
                  {
                    years.map((year, idx) => <Select.Item key={idx} label={year.toString()} value={year.toString()} />)
                  }
                </Select>
              </HStack>
            </HStack>
            <PhotoUpload mt='4' pressedBgColor='gray.100' setLink={setPhoto} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space='2'>
              <Button size='sm' rounded='md' variant='outline' onPress={() => setIsOpen(false)}
                _pressed={{ bgColor: 'gray.200' }}>
                <Text color='black'>Cancel</Text>
              </Button>
              <Button size='sm' rounded='md' bgColor={theme.blue[500]} onPress={editGroup}
                _pressed={{ bgColor: theme.blue[600] }}>
                <Text color='white'>Save</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

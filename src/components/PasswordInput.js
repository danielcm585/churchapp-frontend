import React, { useState } from 'react'

import theme from '../../theme'

import { HStack, Icon, Input, IconButton } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function PasswordInput({ value, setValue, placeholder, icon, mt, mx }) {
  const [ show, setShow ] = useState(false)

  return (
    <>
      <HStack mt={mt || 4} mx={mx || 6} space='4' alignItems='center'>
        <Icon size='md' color={theme.blue[900]} as={MaterialCommunityIcons} name={icon}></Icon>
        <Input w='89%' variant='underlined' placeholder={placeholder} color={theme.blue[900]} 
          _focus={{ borderColor: theme.blue[900] }} onChangeText={(val) => setValue(val)} value={value}
          type={!show && 'password'} InputRightElement={<IconButton onPress={() => setShow(prev => !prev)}
          _icon={
            !show ?
            { color: theme.blue[900], as: MaterialCommunityIcons, name: 'eye' } :
            { color: theme.blue[900], as: MaterialCommunityIcons, name: 'eye-off' }
          } />}
        />
      </HStack>
    </>
  )
}

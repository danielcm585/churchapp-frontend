import React from 'react'

import theme from '../../theme'

import { Icon, Input, Pressable } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function SearchBar({ keyword, setKeyword }) {
  return (
    <>
      <Input h='10' rounded='md' value={keyword} onChangeText={val => setKeyword(val)}
        placeholder='Search' leftElement={<Icon ml='3' as={MaterialIcons} name='search' />}
        onPress={() => setIsFocused(true)} rightElement={
          (keyword.length > 0) && (
            <Pressable onPress={() => setKeyword('')}>
              <Icon mr='3' as={MaterialCommunityIcons} name='close-circle-outline' />
            </Pressable>
          )
        }
        _focus={{ borderColor: theme.blue[500], bgColor: 'white' }}
      />
    </>
  )
}

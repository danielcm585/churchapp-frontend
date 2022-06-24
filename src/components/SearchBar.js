import React from 'react'

import theme from '../../theme'

import { Icon, Input } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function SearchBar({ keyword, setKeyword }) {
  return (
    <>
      <Input h='10' rounded='md' value={keyword} onChangeText={val => setKeyword(val)}
        placeholder='Search' leftElement={<Icon ml='2' as={MaterialIcons} name='search' />}
        _focus={{ borderColor: theme.blue[500], bgColor: 'white' }}
      />
    </>
  )
}

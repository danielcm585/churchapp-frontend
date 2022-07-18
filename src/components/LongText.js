import React, { useState } from 'react'

import theme from '../../theme'

import { Text, Link, HStack, Box } from 'native-base'

export default function LongText({ text }) {
  const [ readMore, setReadMore ] = useState(false)

  return (
    <>
      <Text noOfLines={!readMore && 3}>{text}</Text>
      {
        (text.length > 300) && (
          <HStack>
            <Box w='81%' />
            <Link onPress={() => setReadMore(prev => !prev)}>
              <Text fontSize='xs' fontWeight='bold' color={theme.blue[500]}>
                { !readMore ? 'read more' : 'read less' }
              </Text>
            </Link>
          </HStack>
        )
      }
    </>
  )
}

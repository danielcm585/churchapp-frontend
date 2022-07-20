import React from 'react'

import theme from '@root/theme'

import { HStack, Link, Text } from 'native-base'

export default function Tabs({ pages, page, setPage }) {
  return (
    <>
      <HStack ml='2' my='2'>
        {
          pages.map((title, idx) => (
            <HStack key={idx} px='2'>
              <Link onPress={() => setPage(idx)}>
                {
                  (page === idx) ? (
                    <Text color={(page === idx && theme.blue[500])} fontWeight={(page === idx) && 'bold'}>
                      {title}
                    </Text>
                  ) : <Text>{title}</Text>
                }
              </Link>
            </HStack>
          ))
        }
      </HStack>
    </>
  )
}

import React from 'react'

import { TimeStampSkeleton } from './skeletons'

import { Text } from 'native-base'

export default function TimeStamp({ timeDate }) {
  if (timeDate == null) return <TimeStampSkeleton />

  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  
  const year = parseInt(timeDate.split('-')[0]) % 100
  const month = months[parseInt(timeDate.split('-')[1]) - 1]
  const date = timeDate.split('-')[2].split('T')[0]
  const hour = timeDate.split('T')[1].split(':')[0]
  const minute = timeDate.split(':')[1]

  return (
    <>
      <Text color='gray.400'>{date} {month} {year} , {hour}:{minute}</Text>
    </>
  )
}

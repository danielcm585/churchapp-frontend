import React from 'react'

import { post } from '@root/http'

import { useToast } from 'native-base'
import { Box, Divider, Pressable, VStack } from 'native-base'

export default function NotificationItem({ notification }) {
  const page = notification.link.page
  const id = notification.link.id

  const toast = useToast()

  const readNotif = async () => {
    try {
      const resp = await post(`/notification/${notification._id}`)
      if (resp.status >= 400) throw new Error(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }

  return (
    <>
      <VStack>
        <Pressable onPress={() => {
          readNotif()
          navigation.navigate(page, { id })
        }}>
          <Box p='2'>
            <Text>{notification.title}</Text>
            <Text>{notification.body}</Text>
          </Box>
        </Pressable>
        <Divider />
      </VStack>
    </>
  )
}

import React,{ useEffect, useState } from 'react'

import { get } from '@root/http'

import { Appbar } from '@root/components'
import { NotificationList } from '@root/components/notification'

import { useToast } from 'native-base'

export default function NotificationScreen({ navigation }) {
  const [ notifications, setNotifications ] = useState(null)
  
  const toast = useToast()

  useEffect(async () => {
    try {
      const resp = await get('/notification')
      if (resp.status >= 400) throw new Error(resp.data)
      setNotifications(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => setNotifications(null)

  }, [])

  return (
    <>
      <Appbar title='Notification' navigation={navigation} />
      <NotificationList notifications={notifications} />
    </>
  )
}

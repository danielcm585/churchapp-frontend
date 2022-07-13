import React from 'react'

import { NotificationItem } from './'
import { NotificationListSkeleton } from '../skeletons'

export default function NotificationList({ notifications }) {
  if (notifications == null) return <NotificationListSkeleton />

  return (
    <>
      {
        notifications.map((notification, idx) => 
          <NotificationItem key={idx} notification={notification} />
        )
      }
    </>
  )
}

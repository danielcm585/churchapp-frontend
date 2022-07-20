import React from 'react'

import { NotificationItem } from '@root/components/notification'
import { NotificationListSkeleton } from '@root/components/skeletons'

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

import React, { useState } from 'react'

import { Appbar, ChatInput } from '../components'

export default function GroupScreen({ route, navigation }) {
  const { group } = route.params

  if (group == null) return <GroupScreenSkeleton />

  const [ body, setBody ] = useState('')

  return (
    <>
      <Appbar title={group.name} group={group} navigation={navigation} />
      <ChatInput body={body} setBody={setBody} />
    </>
  )
}

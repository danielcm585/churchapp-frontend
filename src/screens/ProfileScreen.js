import React, { useState } from 'react'

import { Appbar, ChatInput } from '../components'

export default function ProfileScreen({ route, navigation }) {
  const { profile } = route.params
  
  const [ body, setBody ] = useState('')

  return (
    <>
      <Appbar title={profile.name} profile={profile} navigation={navigation} />
      
      <ChatInput body={body} setBody={setBody} />
    </>
  )
}

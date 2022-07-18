import React from 'react'

import { Appbar, Navbar } from '@root/components'

export default function Stream({ navigation }) {
  return (
    <>
      <Appbar title='Stream' mainScreen={true} navigation={navigation} />
      <Navbar page={2} navigation={navigation} />
    </>
  )
}

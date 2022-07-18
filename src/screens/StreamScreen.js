import React from 'react'

import { Appbar, Navbar } from '../components'

export default function Stream({ navigation }) {
  return (
    <>
      <Appbar title='Stream' mainScreen={true} navigation={navigation} />
      <Navbar page={2} navigation={navigation} />
    </>
  )
}

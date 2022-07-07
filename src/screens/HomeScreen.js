import React, { useState } from 'react'

import { Navbar } from '../components'
import { Home, Explore, Stream, Groups, Profile } from '../components/homescreen'

export default function HomeScreen({ navigation }) {
  const [ page, setPage ] = useState(1)

  return (
    <>
      {
        (page === 1) ? <Home navigation={navigation} /> :
        (page === 2) ? <Explore navigation={navigation} /> :
        (page === 3) ? <Stream /> :
        (page === 4) ? <Groups navigation={navigation} /> :
        <Profile navigation={navigation} />
      }
      <Navbar page={page} setPage={setPage} />
    </>
  )
}

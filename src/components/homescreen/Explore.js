import { HStack, VStack } from 'native-base'
import React from 'react'

import { Appbar } from '../'
import { ProfileList } from '../profile'

export default function Explore({ navigation }) {
  // const [ all, setAll ] = useState()
  const all = [
    {
      name: 'Daniel Christian Mandolang',
      username: 'danielcm1',
      photo: 'https://i.ibb.co/B2cSS4q/download.png',
      phone: '+62 813 1323 3290',
      birth: '2012-04-23T18:25:43.511Z'
    },
    {
      name: 'Daniel Christian Mandolang',
      username: 'danielcm1',
      photo: 'https://i.ibb.co/B2cSS4q/download.png',
      phone: '+62 813 1323 3290',
      birth: '2012-04-23T18:25:43.511Z'
    },
    {
      name: 'Daniel Christian Mandolang',
      username: 'danielcm1',
      photo: 'https://i.ibb.co/B2cSS4q/download.png',
      phone: '+62 813 1323 3290',
      birth: '2012-04-23T18:25:43.511Z'
    },
    {
      name: 'Daniel Christian Mandolang',
      username: 'danielcm1',
      photo: 'https://i.ibb.co/B2cSS4q/download.png',
      phone: '+62 813 1323 3290',
      birth: '2012-04-23T18:25:43.511Z'
    },
    {
      name: 'Daniel Christian Mandolang',
      username: 'danielcm1',
      photo: 'https://i.ibb.co/B2cSS4q/download.png',
      phone: '+62 813 1323 3290',
      birth: '2012-04-23T18:25:43.511Z'
    },
    {
      name: 'Daniel Christian Mandolang',
      username: 'danielcm1',
      photo: 'https://i.ibb.co/B2cSS4q/download.png',
      phone: '+62 813 1323 3290',
      birth: '2012-04-23T18:25:43.511Z'
    },
    {
      name: 'Daniel Christian Mandolang',
      username: 'danielcm1',
      photo: 'https://i.ibb.co/B2cSS4q/download.png',
      phone: '+62 813 1323 3290',
      birth: '2012-04-23T18:25:43.511Z'
    },
    {
      name: 'Daniel Christian Mandolang',
      username: 'danielcm1',
      photo: 'https://i.ibb.co/B2cSS4q/download.png',
      phone: '+62 813 1323 3290',
      birth: '2012-04-23T18:25:43.511Z'
    },
  ]

  return (
    <>
      <Appbar title='Explore' mainScreen={true} />
      <VStack mx='4' mt='2'>
        <ProfileList profiles={all} navigation={navigation} />
      </VStack>
    </>
  )
}

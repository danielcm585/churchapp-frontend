import React, { useEffect, useState } from 'react'

import theme from '../../../theme'

import { Appbar, Tabs } from '../'
import { GroupList } from '../group'

import { Fab, Icon } from 'native-base'
import { MaterialIcons } from '@native-base/icons'

export default function Groups({ navigation }) {
  const pages = [ 'My Groups', 'All Groups' ]
  const [ page, setPage ] = useState(0)

  const [ all, setAll ] = useState()
  const [ mine, setMine ] = useState()

  useEffect(() => {
    const myGroups = [
      {
        name: 'Music',
        description: 'Bla bla bla bla',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        status: 'PUBLIC',
        members: [
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          }
        ]
      },
      {
        name: 'Singer',
        description: 'Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        status: 'PRIVATE',
        leaders: [
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
        ],
        members: [
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
        ]
      },
      {
        name: 'Worship Leader',
        description: 'Bla bla bla bla bla bla bla ',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        status: 'PRIVATE',
        member: [
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          }
        ]
      },
      {
        name: 'Usher',
        description: 'Bla bla bla',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
        status: 'PUBLIC',
        member: [
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          },
          {
            name: 'Daniel Christian Mandolang',
            photo: 'https://i.ibb.co/B2cSS4q/download.png',
            phone: '+62 813 1323 3290',
            birth: '2012-04-23T18:25:43.511Z'
          }
        ]
      },
    ] 
    const allGroups = [
      {
        name: 'Music',
        description: 'Bla bla bla bla',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
      },
      {
        name: 'Singer',
        description: 'Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
      },
      {
        name: 'Worship Leader',
        description: 'Bla bla bla bla bla bla bla ',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
      },
      {
        name: 'Usher',
        description: 'Bla bla bla',
        photo: 'https://i.ibb.co/B2cSS4q/download.png',
      },
    ]
    setMine(myGroups)
    // setAll(allGroups)
  }, [])

  return (
    <>
      <Appbar title='Groups' mainScreen={true} />
      <Tabs pages={pages} page={page} setPage={setPage} />
      {
        (page === 0) ? 
          <GroupList groups={mine} mine={true} navigation={navigation} /> :
          <GroupList groups={all} mine={false} navigation={navigation} /> 
      }
      {/* <Fab mb='57' shadow={4} bgColor={theme.blue[500]} icon={<Icon as={MaterialIcons} name='add' />} /> */}
    </>
  )
}

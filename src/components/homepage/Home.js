import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { API_URL, MAIN_GROUP_ID } from '../../../config'

import { get } from '../../http'

import { Layout, Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'

export default function Home() {
  const Title = props => (
    <View style={styles.topNav}>
      <Text {...props} style={styles.title} category='h5'>Home</Text>
    </View>
  )

  const openNotif = () => {
    console.log('NOTIF PAGE')
  }
  const BellIcon = props => <Icon {...props} name='bell-outline' />
  const NotifButton = () => <TopNavigationAction icon={BellIcon} onPress={openNotif} />
  
  const topNavState = { title: Title, accessoryRight: NotifButton }

  const [ posts, setPosts ] = useState()
  const [ events, setEvents ] = useState()
  useEffect(() => {
    const resp = get(API_URL+'group/'+MAIN_GROUP_ID)
    setPosts(resp.posts)
    setEvents(resp.events)
  }, [])

  return (
    <>
      <TopNavigation {...topNavState} />
      <Layout style={styles.screen}>
        <Text category='h1'>HOME</Text>
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  topNav: {
    paddingLeft: 10,
  },
  title: {
    margin: 2,
    fontWeight: 'bold'
  },
})
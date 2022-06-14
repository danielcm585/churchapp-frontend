import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Home, Explore, Stream, Groups, MyProfile } from '../components/homepage'

import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'

export default function HomeScreen() {
  const [ page, setPage ] = useState(0)
  
  const HomeIcon = props => <Icon {...props} name='home-outline' />
  const SearchIcon = props => <Icon {...props} name='search-outline' />
  const PlayIcon = props => <Icon {...props} name='play-circle-outline' />
  const GroupIcon = props => <Icon {...props} name='people-outline' />
  const UserIcon = props => <Icon {...props} name='person-outline' />

  return (
    <>
      {
        (page == 0) ? <Home /> : (
          (page == 1) ? <Explore /> : (
            (page == 2) ? <Stream /> : (
              (page == 3) ? <Groups /> : <MyProfile />
            )
          )
        )
      }
      <BottomNavigation style={styles.bottomNavigation} 
        selectedIndex={page} onSelect={setPage}>
        <BottomNavigationTab icon={HomeIcon} />
        <BottomNavigationTab icon={SearchIcon} />
        <BottomNavigationTab icon={PlayIcon} />
        <BottomNavigationTab icon={GroupIcon} />
        <BottomNavigationTab icon={UserIcon} />
      </BottomNavigation>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavigation: {
    marginVertical: 0,
  },
})

import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'

import { SearchBar } from '@root/components'
import { ProfileItem } from '@root/components/profile'
import { ProfileListSkeleton } from '@root/components/skeletons'

import { ScrollView, VStack } from 'native-base'

export default function ProfileList({ profiles, select, setSelected, modal, navigation, refresh }) {
  const [ keyword, setKeyword ] = useState('')
  const [ filtered, setFiltered ] = useState(null)

  useEffect(() => {
    if (profiles == null) return

    const filteredProfiles = profiles.filter(profile => {
      if (profile.name == null || !profile.name) return false
      return profile.name.toLowerCase().includes(keyword.toLowerCase())
    })
    setFiltered(filteredProfiles)
  }, [ keyword, profiles ])

  const [ refreshing, setRefreshing ] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  if (filtered == null) return <ProfileListSkeleton />
  return (
    <>
      <VStack>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
      </VStack>
      <ScrollView mt='2' refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {
          filtered.map((profile, idx) => 
            <ProfileItem key={idx} modal={modal} profile={profile} select={select} 
              setSelected={setSelected} navigation={navigation} />
          )
        }
      </ScrollView>
    </>
  )
}

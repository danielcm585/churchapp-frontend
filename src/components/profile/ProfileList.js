import React, { useEffect, useState } from 'react'

import { SearchBar } from '../'
import { ProfileItem } from './'
import { ProfileListSkeleton } from '../skeletons'

import { ScrollView, VStack } from 'native-base'

export default function ProfileList({ profiles, select, setSelected, modal, navigation }) {
  if (profiles == null) return <ProfileListSkeleton />

  const [ keyword, setKeyword ] = useState('')
  const [ filtered, setFiltered ] = useState(null)
  useEffect(() => {
    const filteredProfiles = profiles.filter(profile => {
      if (profile.name == null || !profile.name) return false
      return profile.name.toLowerCase().includes(keyword.toLowerCase())
    })
    setFiltered(filteredProfiles)

    return () => setFiltered(null)

  }, [ keyword ])

  if (filtered == null) return <ProfileListSkeleton />
  return (
    <>
      <VStack>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
      </VStack>
      <ScrollView mt='2'>
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

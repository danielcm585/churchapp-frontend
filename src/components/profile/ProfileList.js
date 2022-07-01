import React, { useEffect, useState } from 'react'

import { SearchBar } from '../'
import { ProfileListSkeleton, ProfileItem } from './'

import { ScrollView, VStack } from 'native-base'

export default function ProfileList({ profiles, select, setSelected, modal, navigation }) {
  if (profiles == null) return <ProfileListSkeleton />

  const [ keyword, setKeyword ] = useState('')
  const [ filtered, setFiltered ] = useState()
  useEffect(() => {
    const filteredProfiles = profiles.filter(profile => profile.name.toLowerCase().includes(keyword.toLowerCase()))
    setFiltered(filteredProfiles)
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
            <ProfileItem key={idx} modal={modal} profile={profile} select={select} setSelected={setSelected} navigation={navigation} />
          )
        }
      </ScrollView>
    </>
  )
}

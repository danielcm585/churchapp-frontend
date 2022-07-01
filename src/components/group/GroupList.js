import React, { useEffect, useState } from 'react'

import { GroupItem, GroupListSkeleton } from './'
import { SearchBar } from '../'

import { Center, HStack, ScrollView, VStack } from 'native-base'

export default function GroupList({ navigation, groups, mine }) {
  if (groups == null) return <GroupListSkeleton />

  const [ keyword, setKeyword ] = useState('')
  const [ filtered, setFiltered ] = useState()
  useEffect(() => {
    const filteredGroups = groups.filter(group => group.name.toLowerCase().includes(keyword.toLowerCase()))
    setFiltered(filteredGroups)
  }, [ keyword ])

  if (filtered == null) return <GroupListSkeleton />

  const split = (arr) => {
    const mid = (arr.length+1) / 2
    const left = arr.slice(0,mid);
    const right = arr.slice(mid,arr.length)
    return { left, right }
  }
  const { left, right } = split(filtered)

  return (
    <>
      <VStack mx='4' mb='2'>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
      </VStack>
      <ScrollView>
        <Center w='100%' mx='4'>
          <HStack w='100%' space='2'>
            <VStack w='45%' space='2'>
              {
                left.map((group, idx) => 
                  <GroupItem key={idx} group={group} mine={mine} navigation={navigation} />)
              }
            </VStack>
            <VStack w='45%' space='2'>
              {
                right.map((group, idx) => 
                  <GroupItem key={idx} group={group} mine={mine} navigation={navigation} />)
              }
            </VStack>
          </HStack>
        </Center>
      </ScrollView>
    </>
  )
}

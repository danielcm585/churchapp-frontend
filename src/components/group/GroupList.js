import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'

import config from '@root/config'

import { GroupListSkeleton } from '@root/components/skeletons'
import { GroupItem } from '@root/components/group'
import { SearchBar } from '@root/components'

import { Center, HStack, ScrollView, VStack } from 'native-base'

export default function GroupList({ navigation, groups, mine, refresh }) {
  const [ keyword, setKeyword ] = useState('')
  
  const split = (arr) => {
    const mid = parseInt((arr.length+1)/2)
    const left = arr.slice(0,mid)
    const right = arr.slice(mid,arr.length)
    return { left, right }
  }

  const [ left, setLeft ] = useState(null)
  const [ right, setRight ] = useState(null)

  useEffect(() => {
    if (groups == null) return

    const filteredGroups = groups.filter(group => group.name.toLowerCase().includes(keyword.toLowerCase()) && group._id != config.MAIN_GROUP_ID)
    const splitted = split(filteredGroups)
    setLeft(splitted.left)
    setRight(splitted.right)

  }, [ groups, keyword ])

  const [ refreshing, setRefreshing ] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  if (left == null || right == null) return <GroupListSkeleton />
  return (
    <>
      <VStack mx='4' mb='2'>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
      </VStack>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* <Center mx='4'> */}
          <HStack mx='4' justifyContent='space-between'>
            <VStack w='49%' space='2'>
              {
                left.map((group, idx) => 
                  <GroupItem key={idx} group={group} mine={mine} navigation={navigation} />
                )
              }
            </VStack>
            <VStack w='49%' space='2'>
              {
                right.map((group, idx) => 
                  <GroupItem key={idx} group={group} mine={mine} navigation={navigation} />
                )
              }
            </VStack>
          </HStack>
        {/* </Center> */}
      </ScrollView>
    </>
  )
}

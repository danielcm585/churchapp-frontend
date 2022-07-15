import React, { useState, useEffect } from 'react'

import { get } from '../http'
import { getData } from '../utils'

import { Appbar, LongText } from '../components'
import { ProfileGrid } from '../components/profile'
import { GroupDetailsScreenSkeleton } from '../components/skeletons'

import { useToast } from 'native-base'
import { Avatar, Divider, HStack, Icon, Image, ScrollView, Text, VStack } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function GroupDetailsScreen({ route, navigation }) {
  const { id } = route.params

  const [ group, setGroup ] = useState(null)
  
  const toast = useToast()
  
  useEffect(async () => {
    try {
      const resp = await get(`/group/${id}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setGroup(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => setGroup(null)

  }, [])
  
  const [ isLeader, setIsLeader ] = useState(false)
  
  useEffect(async () => {
    if (group == null) return
    
    const me = await getData('user')
    const check = group.leaders.filter(leader => leader._id == me._id)
    setIsLeader(check.length > 0)
  }, [ group ])
  
  
  if (group == null) return <GroupDetailsScreenSkeleton navigation={navigation} />
  return (
    <>
      <Appbar title={group.name} group={group} navigation={navigation} />
      <ScrollView>
        <Image h='200' alt='Group Image' source={{ uri: group.photo }} />
        <HStack mx='4' mt='2'>
          <Text bold fontSize='2xl'>{group.name}</Text> 
        </HStack>
        <HStack w='100%' mt='1' mx='4' space='2' alignItems='center'>
          <HStack space='1'>
            <Text bold>{group.members.length}</Text>
            <Text>members</Text>
          </HStack>
          <Divider orientation='vertical' />
          <HStack space='1' alignItems='center'>
            {
              (group.status === 'PRIVATE') ? 
                <Icon as={MaterialIcons} name='lock' color='gray.500' /> : 
                <Icon as={MaterialCommunityIcons} name='lock-open-variant' color='gray.500' />
            }
            <Text color='gray.500'>{group.status} GROUP</Text>
          </HStack>
        </HStack>
        <HStack mx='4'>
          <Avatar.Group mt='3' max='5'>
            {
              group.members.map((member, idx) => <Avatar key={idx} source={{ uri: member.photo }} />)
            }
          </Avatar.Group>
        </HStack>
        <VStack mx='4' mt='4' p='3' rounded='md' bgColor='white'>
          <Text bold mb='1'>Description</Text>
          <LongText text={group.description} />
        </VStack>
        <VStack mx='4' mt='4' p='3' rounded='md' bgColor='white'>
          <Text bold>Leaders</Text>
          <ProfileGrid profiles={group.leaders} navigation={navigation} />
        </VStack>
        <VStack mx='4' mt='4' p='3' rounded='md' bgColor='white'>
          <Text bold>Members</Text>
          <ProfileGrid profiles={group.members} navigation={navigation} />
        </VStack>
        {
          (isLeader && group.invites != null && group.invites.length > 0) && (
            <VStack mx='4' mt='4' p='3' rounded='md' bgColor='white'>
              <Text bold>Pending Invites</Text>
              <ProfileGrid profiles={group.invites} navigation={navigation} />
            </VStack>
          )
        }
        {
          (isLeader && group.pendings != null && group.pendings.length > 0) && (
            <VStack mx='4' mt='4' p='3' rounded='md' bgColor='white'>
              <Text bold>Pending Requests</Text>
              <ProfileGrid profiles={group.pendings} navigation={navigation} />
            </VStack>
          )
        }
      </ScrollView>
    </>
  )
}

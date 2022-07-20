import React, { useState, useEffect } from 'react'

import { get, put } from '@root/http'

import { LongText, TimeStamp } from '@root/components'
import { PostItemSkeleton } from '@root/components/skeletons'
import { EditPostModal } from '@root/components/post'

import { useToast } from 'native-base'
import { Flex, Menu, Avatar, Divider, HStack, Link, Text, VStack, Image, Icon, Pressable } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@native-base/icons'

export default function PostItem({ navigation, id }) {
  const [ post, setPost ] = useState(null)

  const toast = useToast()

  useEffect(async () => {
    try {
      const resp = await get(`/post/one/${id}`)
      if (resp.status >= 400) throw new Error(resp.data)
      setPost(resp.data)
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }

    return () => setPost(null)

  }, [])

  const pinPost = async () => {
    try {
      const resp = await put(`/post/${id}`, {
        pinned: true
      })
      if (resp.status >= 400) throw new Error(resp.data)
      toast.show({
        title: 'Post pinned',
        placement: 'bottom'
      })
    }
    catch (err) {
      toast.show({
        title: err.message,
        placement: 'bottom'
      })
    }
  }

  const [ openEdit, setOpenEdit ] = useState(false)

  if (post == null) return <PostItemSkeleton />
  return (
    <>
      <VStack mx='4'>
        <HStack py='4'>
          <Link onPress={() => navigation.navigate('ProfileDetails', { id: post.creator._id })}>
            <Avatar size='10' source={{ uri: post.creator.photo }} />
          </Link>
          <VStack ml='4' w='84%'>
            <HStack alignItems='center' justifyContent='space-between'>
              <HStack space='2' alignItems='center'>
                <Link onPress={() => navigation.navigate('ProfileDetails', { id: post.creator._id })}>
                  <Text fontWeight='bold'>{post.creator.name}</Text>
                </Link>
                <Flex h='1' w='1' bgColor='gray.400' rounded='full'></Flex>
                <TimeStamp timeDate={post.createdAt} />
              </HStack>
              <Menu closeOnSelect={false} trigger={triggerProps => 
                <Pressable {...triggerProps}>
                  <Icon color='black' as={MaterialCommunityIcons} name='dots-vertical' />
                </Pressable>
              }>
                <Menu.Item key={0} onPress={pinPost}>
                  <HStack alignItems='center' space={1}>
                    <Icon color='black' as={MaterialIcons} name='push-pin' />
                    <Text>Pin Post</Text>
                  </HStack>
                </Menu.Item>
                <Menu.Item key={1} onPress={() => setOpenEdit(true)}>
                  <HStack alignItems='center' space={1}>
                    <Icon color='black' as={MaterialIcons} name='edit' />
                    <Text>Edit Post</Text>
                  </HStack>
                </Menu.Item>
                <Menu.Item key={2}>
                  <HStack alignItems='center' space={1}>
                    <Icon color='black' as={MaterialIcons} name='content-copy' />
                    <Text>Copy Post</Text>
                  </HStack>
                </Menu.Item>
                <Divider />
                <Menu.Item key={3}>
                  <HStack alignItems='center' space={1}>
                    <Icon color='red.500' as={MaterialIcons} name='report-problem' />
                    <Text color='red.500'>Report Post</Text>
                  </HStack>
                </Menu.Item>
                <Menu.Item key={4}>
                  <HStack alignItems='center' space={1}>
                    <Icon color='red.500' as={MaterialIcons} name='delete' />
                    <Text color='red.500'>Delete Post</Text>
                  </HStack>
                </Menu.Item>
              </Menu>
            </HStack>
            {
              (post.photo != null) && 
                <Image mt='1' mb='1' minWidth='200' minHeight='200' maxWidth='300' maxHeight='300' alt="Photo" source={{ uri: post.photo }} />
            }
            <LongText text={post.body} />
          </VStack>
        </HStack>
        <Divider />
      </VStack>
      <EditPostModal post={post} isOpen={openEdit} setIsOpen={setOpenEdit} />
    </>
  )
}

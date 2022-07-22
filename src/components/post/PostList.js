import React, { useRef, useState } from 'react'
import { RefreshControl } from 'react-native'

import { PostItem } from '@root/components/post'
import { PostListSkeleton } from '@root/components/skeletons'

import { ScrollView } from 'native-base'

export default function PostList({ posts, navigation, reverse, refresh }) {
  const scrollViewRef = useRef()
  const moveToNow = () => {
    scrollViewRef.current.scrollToEnd({ animated: true })
  }

  const [ refreshing, setRefreshing ] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  if (posts == null) return <PostListSkeleton />
  return (
    <>
      <ScrollView ref={scrollViewRef} onContentSizeChange={reverse && moveToNow}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {
          posts.map((post, idx) => <PostItem key={idx} id={post} navigation={navigation} />)
        }
      </ScrollView>
    </>
  )
}

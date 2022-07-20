import React, { useRef } from 'react'

import { PostItem } from '@root/components/post'
import { PostListSkeleton } from '@root/components/skeletons'

import { ScrollView } from 'native-base'

export default function PostList({ posts, navigation, reverse }) {
  const scrollViewRef = useRef()
  const moveToNow = () => {
    scrollViewRef.current.scrollToEnd({ animated: true })
  }

  if (posts == null) return <PostListSkeleton />
  return (
    <>
      <ScrollView ref={scrollViewRef} onContentSizeChange={reverse && moveToNow}>
        {
          posts.map((post, idx) => <PostItem key={idx} id={post} navigation={navigation} />)
        }
      </ScrollView>
    </>
  )
}

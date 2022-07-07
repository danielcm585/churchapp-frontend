import React from 'react'

import { PostItem, PostListSkeleton } from './'

import { ScrollView } from 'native-base'

export default function PostList({ posts, navigation }) {
  if (posts == null) return <PostListSkeleton />
  
  return (
    <>
      <ScrollView>
        {
          posts.map((post, idx) => <PostItem key={idx} post={post} navigation={navigation} />)
        }
      </ScrollView>
    </>
  )
}

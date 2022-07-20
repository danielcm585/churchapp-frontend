import React from 'react'

import { PostItem } from '@root/components/post'
import { PostListSkeleton } from '@root/components/skeletons'

import { ScrollView } from 'native-base'

export default function PostList({ posts, navigation }) {
  if (posts == null) return <PostListSkeleton />
  return (
    <>
      <ScrollView>
        {
          posts.map((post, idx) => <PostItem key={idx} id={post} navigation={navigation} />)
        }
      </ScrollView>
    </>
  )
}

import React from 'react'

import { Post, PostListSkeleton } from './'

import { ScrollView } from 'native-base'

export default function PostList({ posts }) {
  if (posts == null) return <PostListSkeleton />

  console.log(posts)
  
  return (
    <>
      <ScrollView>
        {
          posts.map((post, idx) => <Post key={idx} post={post} />)
        }
      </ScrollView>
    </>
  )
}

import React from 'react'

import { PostSkeleton } from '@root/components/post'

import { ScrollView } from 'native-base'

export default function PostListSkeleton() {
  return (
    <>
      <ScrollView>
        {
          [...Array(10).keys()].map((_, idx) => <PostSkeleton key={idx} />)
        }
      </ScrollView>
    </>
  )
}

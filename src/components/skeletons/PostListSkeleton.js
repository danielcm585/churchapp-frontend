import React from 'react'

import { PostItemSkeleton } from '@root/components/skeletons'

import { ScrollView } from 'native-base'

export default function PostListSkeleton() {
  return (
    <>
      <ScrollView>
        {
          [...Array(10).keys()].map((_, idx) => <PostItemSkeleton key={idx} />)
        }
      </ScrollView>
    </>
  )
}

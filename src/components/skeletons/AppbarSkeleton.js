import React from 'react'

import { IconButton, Icon, StatusBar, Box, HStack, Skeleton, Menu } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@native-base/icons'

export default function AppbarSkeleton({ mainScreen, navigation }) {
  return (
    <>
      <StatusBar bg='#3700B3' barStyle='light-content' />
      <Box safeAreaTop bg='#6200ee' />
      <HStack bg='white' px='1' py='1' justifyContent='space-between' alignItems='center' w='100%'>
        {
          mainScreen ? (
            <IconButton icon={<Icon size='md' as={MaterialIcons} name='menu' color='black' />} />
          ) : (
            <IconButton icon={<Icon size='md' as={MaterialIcons} name='arrow-back' color='black' />}
            onPress={() => navigation.goBack()}
            />
          )
        }
        {/* <Text bold color='black' fontSize='lg' maxW='300' isTruncated>{title}</Text> */}
        <Skeleton h='3' w='20' rounded='full' startColor='gray.300' />
        {
          mainScreen ? (
            <IconButton icon={<Icon as={MaterialCommunityIcons} name='bell' size='md' color='black' />} />
          ) : (
            <>
              <Menu closeOnSelect={false} trigger={triggerProps => <IconButton {...triggerProps} 
                icon={<Icon as={MaterialCommunityIcons} name='dots-vertical' size='md' color='black' />} 
              />}></Menu>
            </>
          )
        }
      </HStack>
    </>
  )
}

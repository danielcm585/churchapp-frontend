import React from 'react'

export default function navbar({ page, setPage }) {
  return (
    <Box flex={1} bg="white" safeAreaTop width="100%" maxW="300px" alignSelf="center">
      <Center flex={1}></Center>
      <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable cursor="pointer" opacity={page === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setPage(0)}>
          <Center>
            <Icon mb="1" as={<MaterialCommunityIcons name={page === 0 ? "home" : "home-outline"} />} color="white" size="sm" />
            <Text color="white" fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={page === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setPage(1)}>
          <Center>
            <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="sm" />
            <Text color="white" fontSize="12">
              Search
            </Text>
          </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={page === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setPage(2)}>
          <Center>
            <Icon mb="1" as={<MaterialCommunityIcons name={page === 2 ? "cart" : "cart-outline"} />} color="white" size="sm" />
            <Text color="white" fontSize="12">
              Cart
            </Text>
          </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={page === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setPage(3)}>
          <Center>
            <Icon mb="1" as={<MaterialCommunityIcons name={page === 3 ? "account" : "account-outline"} />} color="white" size="sm" />
            <Text color="white" fontSize="12">
              Account
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  )
}

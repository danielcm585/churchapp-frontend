import AsyncStorage from '@react-native-async-storage/async-storage'

export default storeData = async (key) => {		
  try {
    await AsyncStorage.removeItem(key)
    return 'Success'
  } catch (err) {
    return `Error ${err}`
  }
}
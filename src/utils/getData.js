import AsyncStorage from '@react-native-async-storage/async-storage'

export default getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    console.log(value)
    console.log(value == null)
    return value
  } catch (err) {
    return null
  }
}
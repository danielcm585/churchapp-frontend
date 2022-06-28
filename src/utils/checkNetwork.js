import { useNetInfo } from '@react-native-community/netinfo'

export default checkNetwork = () => {
  return useNetInfo()
}
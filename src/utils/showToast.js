import { useToast } from 'native-base'

export default (message) => {
  const toast = useToast()
  toast.show({
    title: message,
    placement: 'bottom'
  })
}
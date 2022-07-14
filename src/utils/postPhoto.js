import axios from 'axios'

export default postPhoto = async (photo) => {
  if (photo == null) return null
  let result = null
  var reader = new FileReader()
  // reader.readAsDataURL(photo)
  reader.onload = async () => {
    const image = reader.result.split(',')[1]
    const form = new FormData()
    form.append('image',image)
    await axios.post('https://api.imgbb.com/1/upload?key=1f7342009732d86b66bfab298a07677d', form)
      .then(resp => {
        if (resp.success) result = resp.data.url
      })
      .catch((err) => console.log(err.message))
  }
  reader.onerror = () => null
  return result
}
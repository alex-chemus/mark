//type Callback = (...args: any) => void
import { store } from '@/store'

interface IParams {
  path: string,
  data?: {
    [key: string]: any // eslint-disable-line
  }
  //callback: Callback
}

/*const useFetch = ({ path, form, callback }: IParams) => {
  const url = 'https://api.findcreek.com'

  fetch(`${url}/${path}/`, {
    method: 'POST',
    body: form
  })
    .then(res => res.json())
    .then(callback)
}*/

/*const useFetch = async ({ path, form }: IParams) => {
  const url = 'https://api.findcreek.com'

  const res = await fetch(`${url}/${path}/`, {
    method: 'POST',
    body: form
  })

  const data = await res.json()

  return data
}*/

const useFetch = async ({ path, data }: IParams) => {
  const form = new FormData()
  const url = 'https://api.findcreek.com'

  if (!store.state.token) return null
  form.append('token', `${store.state.token}`)

  /* eslint-disable */
  if (data) {
    for (let [key, value] of Object.entries(data)) {
      form.append(key, value)
    }
  }
  /* eslint-enable */

  const res = await fetch(`${url}/${path}/`, {
    method: 'POST',
    body: form
  })

  const result = await res.json()
  return result
}

export default useFetch

type Callback = (...args: any) => void

interface IParams {
  path: string,
  form: any, // eslint-disable-line
  callback: Callback
}

const useFetch = ({ path, form, callback }: IParams) => {
  const url = 'https://api.findcreek.com'

  fetch(`${url}/${path}/`, {
    method: 'POST',
    body: form
  })
    .then(res => res.json())
    .then(callback)
}

export default useFetch

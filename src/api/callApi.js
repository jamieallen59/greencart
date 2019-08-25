
const isSuccessfulResponse = ({ status }) =>
  status >= 200 && status < 300

export default (method = 'GET', url, payload) => {
  const body = JSON.stringify(payload)

  // Default options are marked with *
  const fetchOptions = {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Origin': window.location.origin,
      'Access-Control-Request-Method': method
      //'Access-Control-Allow-Origin': '*'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body, // body data type must match "Content-Type" header
  }

  return fetch(url, fetchOptions)
    .then(response => {
      if (isSuccessfulResponse(response)) {
        return response.json()
      }

      return response.json().then(error => {
        console.log('Fetch error', error)
        return { error }
      })
    })
    .catch(error => {
      console.log('Fetch error', error)
      return { error }
    })
}
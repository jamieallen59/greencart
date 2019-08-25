import callApi from './callApi'
import { fetchImpactDataEndpoint } from './endpoints'

export const fetchImpactData = payload => {
  const endpoint = fetchImpactDataEndpoint()
  const method = 'POST'

  return callApi(method, endpoint, payload)
}
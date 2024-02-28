import md5 from 'crypto-js/md5'
const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '')

const password = 'Valantis'
const apiUrl = 'https://api.valantis.store:41000'

const combinedString = `${password}_${currentDate}`
const hashedString = md5(combinedString).toString()

const getHeaders = (additionalHeaders = {}) => {
  const defaultHeaders = {
    'X-Auth': hashedString,
    'Content-Type': 'application/json',
  }
  return {
    ...defaultHeaders,
    ...additionalHeaders,
  }
}

const handleFetchWithRetry = async (
  url,
  requestOptions,
  maxRetries = 3,
  signal
) => {
  let retries = 0

  const attemptFetch = async () => {
    try {
      const response = await fetch(url, { ...requestOptions, signal })

      if (!response.ok) {
        throw new Error('Authorization failed')
      }

      return await response.json()
    } catch (error) {
      console.error(error)

      retries++
      if (retries < maxRetries) {
        console.log(`🛑ЗАПРОС... (ПОПЫТКА ${retries})`)
        return attemptFetch()
      } else {
        console.error('Ошибка после 3 запросов')
        throw error
      }
    }
  }

  return attemptFetch()
}

export const getIDs = async (signal) => {
  const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      action: 'get_ids',
      params: {
        offset: 0,
        limit: 1e5,
      },
    }),
  }

  try {
    const url = 'https://api.valantis.store:41000/'
    return await handleFetchWithRetry(url, requestOptions, 3, signal)
  } catch (error) {
    console.error('Failed to fetch IDs:', error)
  }
}

export const getProductInfo = async (id, signal) => {
  const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      action: 'get_items',
      params: {
        ids: [`${id}`],
      },
    }),
  }

  try {
    return await handleFetchWithRetry(apiUrl, requestOptions, 3, signal)
  } catch (error) {
    console.error('Failed to fetch info:', error)
  }
}
export const getSortedProducts = async (props, signal) => {
  const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      action: 'filter',
      params: props,
    }),
    signal: signal,
  }

  try {
    const url = 'https://api.valantis.store:41000/'
    return await handleFetchWithRetry(url, requestOptions, 3, signal)
  } catch (error) {
    console.error('Failed to fetch sortedIDs:', error)
  }
}

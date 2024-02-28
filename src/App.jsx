import React, { useEffect, useRef } from 'react'
import Pages from './components/Pages'
import { getIDs } from './utils/api'
import { useContext } from 'react'
import { ProductsContext } from './context/products'

function App() {
  const { setIDs, setSortedIDs } = useContext(ProductsContext)
  const abortController = useRef(new AbortController())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { signal } = abortController.current
        const result = await getIDs(signal)
        setIDs(result.result)
        setSortedIDs(result.result)
      } catch (error) {
        console.error('Error fetching IDs:', error)
      }
    }
    fetchData()
    return () => {
      abortController.current.abort('Request was canceled❤️')
    }
  }, [])

  return (
    <>
      <Pages></Pages>
    </>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import Pages from './components/Pages'
import { getIDs } from './utils/api'
import { useContext } from 'react'
import { ProductsContext } from './context/products'

function App() {
  const { setIDs, setSortedIDs } = useContext(ProductsContext)

  useEffect(() => {
    console.log('useeffect')
    const fetchData = async () => {
      try {
        const result = await getIDs()
        setIDs(result.result)
        setSortedIDs(result.result)
      } catch (error) {
        console.error('Error fetching IDs:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Pages></Pages>
    </>
  )
}

export default App

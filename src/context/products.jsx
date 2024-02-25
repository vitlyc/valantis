import { createContext, useState, useEffect } from 'react'

export const ProductsContext = createContext({
  IDs: [],
  setIDs: () => {},
  sortedIDs: [],
  setSortedIDs: () => {},
})

export const ProductsProvider = ({ children }) => {
  const [IDs, setIDs] = useState([])
  const [sortedIDs, setSortedIDs] = useState([])
  const value = { IDs, setIDs, sortedIDs, setSortedIDs }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ProductsProvider } from './context/products.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductsProvider>
    <App />
  </ProductsProvider>
)

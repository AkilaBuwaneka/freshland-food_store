import React from 'react'
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
//import Categories from './pages/Categories'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'

const App = () => {
  return (
    <div>
       <Router>
        <Nav />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        {/* <Route path="/products/:categoryId" element={<ProductsByCat />} /> */}
      </Routes>
    </Router>
    </div>
  )
}

export default App

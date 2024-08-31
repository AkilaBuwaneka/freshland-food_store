import React from 'react'
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Categories from './pages/Categories'
import CategoryProducts from './pages/CategoryProducts'

const App = () => {
  return (
    <div>
       <Router>
        <Nav />
      <Routes>
        <Route path="/category" element={<Categories />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App

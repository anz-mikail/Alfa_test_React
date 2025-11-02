import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Products from "./main/products/Products";
import CreateProduct from "./main/createProduct/CreateProduct";
import ProductID from "./main/productId/ProductID";
import './App.css';


function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/products')
    }, []);

  return (
      <div className='html'>
          <div className="body">
              <Header/>
              <Routes>
                  <Route path='/products' element={<Products />} />
                  <Route path='/create-product' element={<CreateProduct />} />
                  <Route path='/products/:id' element={<ProductID />} />
              </Routes>
              <Footer/>
          </div>
      </div>
  );
}


export default App;

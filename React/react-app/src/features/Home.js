import React, { useState } from "react";
import axios from 'axios';
import data from "../app/data";
import Product from "./Product";
import AddForm from "./Product/AddForm";
import Container from "./Container";

// ตัวนับ id สินค้าล่าสุด (เริ่มจาก 9)
let currentProductId = 9;

function Home() {
  const [products, setProducts] = useState(data);

useEffect(() => {
    async function getProducts() {
      const products = await axios.get('https://68e9fc47f1eeb3f856e5a63c.mockapi.io/products');
      setProducts(products.data);
    }

    getProducts();
  }, []); // Put the empty array to make sure that the hook is executed only once


  function addProduct(product) {
    const newProduct = { id: ++currentProductId, ...product };
    setProducts([...products, newProduct]);
  }

  return (
    <>
      <h1>New Products</h1>
      
      {products.length > 0 ? (
        <ul className="Home__products">
          {products.map((product) => (
            <Product key={product.id} item={product} />
          ))}
        </ul>
      ) : (
        <div>Loading products....</div>
      )}
      <AddForm addProduct={addProduct} />
    </>
  );
}

export default Home;

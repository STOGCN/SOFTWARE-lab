import React, { useState } from "react";
import data from "../app/data";
import Product from "./Product";
import AddForm from "./Product/AddForm";
import Container from "./Container";

// ตัวนับ id สินค้าล่าสุด (เริ่มจาก 9)
let currentProductId = 9;

function Home() {
  const [products, setProducts] = useState(data);

  function addProduct(product) {
    const newProduct = { id: ++currentProductId, ...product };
    setProducts([...products, newProduct]);
  }

  return (
    <Container>
      <h1>New Products</h1>
      
      <ul className="Home__products">
        {products.map((product) => (
          <Product key={product.id} item={product} />
        ))}
      </ul>
      <AddForm addProduct={addProduct} />
    </Container>
  );
}

export default Home;

import React, { useEffect, useReducer } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Product from "./Product";
import AddForm from "./Product/AddForm";

// // ตัวนับ id สินค้าล่าสุด (เริ่มจาก 9)
// // let currentProductId = 9;

// // Reducer สำหรับจัดการ state ของ products
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "GET_PRODUCTS":
//       return action.payload;
//     case "ADD_PRODUCT":
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };

// function Home({ className }) {
//   const [products, dispatch] = useReducer(reducer, []);

//   useEffect(() => {
//     async function getProducts() {
//       try {
//         const res = await axios.get(
//           "https://68e9fc47f1eeb3f856e5a63c.mockapi.io/products"
//         );
//         dispatch({ type: "GET_PRODUCTS", payload: res.data });
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     }

//     getProducts();
//   }, []);

//   // function addProduct(product) {
//   //   const newProduct = { id: ++currentProductId, ...product };
//   //   dispatch({ type: "ADD_PRODUCT", payload: newProduct });
//   // }

//   return (
//     <div className={className}>
//       <h1>New Products</h1>

//       {products.length > 0 ? (
//         <ul className="Home__products">
//           {products.map((product) => (
//             <Product key={product.id} item={product} />
//           ))}
//         </ul>
//       ) : (
//         <div>Loading products....</div>
//       )}

//       {/* <AddForm addProduct={addProduct} /> */}
//     </div>
//   );
// }



function Home({ className, products }) {
  return (
    <div className={className}>
      <h1>New Products</h1>
      <ul className="Home__products">
        {products.map((product) => (
          <Product key={product.id} item={product} />
        ))}
      </ul>
    </div>
  );
}



Home.propTypes = {
  className: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired
};

export default styled(Home)`
  .Home__products {
    display: flex;
    flex-wrap: wrap;

    list-style-type: none;
    padding: 0;
    margin: 0 -12px;
  }
`;

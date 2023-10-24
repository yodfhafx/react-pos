import { Stack, Form, Button, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import ProductItem from "./ProductItem";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  const fetchProducts = async () => {
    const queryString = query ? `?search=${query}` : "";
    const res = await axios.get(`/products${queryString}`);

    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="fs-3 text-center">All Products</h1>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          placeholder="Enter product name or sku..."
          onChange={(e) => setQuery(e.target.value)}
        ></Form.Control>
        <div className="vr"></div>
        <Button onClick={() => fetchProducts()}>Search</Button>
      </Stack>
      {isEmpty(products) ? (
        <div className="py-2">No products found</div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-2 py-2">
          {products.map((product) => (
            <ProductItem key={product.id} product={product}></ProductItem>
          ))}
        </Row>
      )}
    </>
  );
};

export default Products;

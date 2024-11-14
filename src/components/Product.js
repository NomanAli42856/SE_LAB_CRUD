import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!name || !price || !description || !category) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      await axios.post("http://localhost:5000/product", {
        name,
        price,
        description,
        category,
      });
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product");
    }
  };

  return (
    <div className="App">
      <h1>Product CRUD</h1>
      <form onSubmit={(e) => e.preventDefault()} className="product-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <button className="add-button" onClick={handleAddProduct}>Add Product</button>
        {error && <p className="error-text">{error}</p>}
      </form>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              refreshProducts={fetchProducts}
              />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;

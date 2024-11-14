import React, { useState } from "react";
import axios from "axios";
import "./ProductCard.css"; // Ensure CSS file is created or adapted

function ProductCard({ product, refreshProducts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/product/${product._id}`);
      refreshProducts(); // Calls parent function to refresh product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/product/${product._id}`,
        updatedProduct
      );
      setIsEditing(false);
      refreshProducts(); // Refresh after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <>
          <input
            value={updatedProduct.name}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, name: e.target.value })
            }
          />
          <input
            value={updatedProduct.price}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, price: e.target.value })
            }
          />
          <input
            value={updatedProduct.description}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                description: e.target.value,
              })
            }
          />
          <input
            value={updatedProduct.category}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, category: e.target.value })
            }
          />
          <button className="save-button" onClick={handleUpdate}>Save</button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <p>{product.category}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ProductCard;

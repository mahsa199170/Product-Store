import React, { useState } from 'react';
import './CreatePage.scss';
import { createProduct } from '@/slice/productSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const actionResult = await dispatch(createProduct(newProduct));

    if (createProduct.fulfilled.match(actionResult)) {
      navigate('/'); // Redirect to home
      console.log(actionResult.payload.message);
      toast.success(actionResult.payload.message);
    } else {
      console.log(actionResult.payload);
      toast.error(actionResult.payload);
    }
  };

  return (
    <div className="create-container">
      <h1 className="create-title">Create New Product</h1>

      <div className="create-form">
        <input
          type="text"
          placeholder="Product Name"
          name="name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          name="image"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />

        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default CreatePage;

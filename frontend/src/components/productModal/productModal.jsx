import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '@/slice/productSlice';
import ReactDOM from 'react-dom';
import './productModal.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const result = await dispatch(
      updateProduct({ pid: product._id, updatedProduct: form })
    );
    console.log('result', result.payload);

    if (updateProduct.fulfilled.match(result)) {
      const { message } = result.payload;
      toast.success(message);
      onClose();
    } else {
      toast.error(result.payload || 'Failed to update product');
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Update Product</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default UpdateProductModal;

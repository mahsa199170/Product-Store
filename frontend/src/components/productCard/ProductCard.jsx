import React, { useState } from 'react';
import './ProductCard.scss';
import { deleteProduct } from '@/slice/productSlice';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import UpdateProductModal from '../productModal/productModal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // const handleDelete = async () => {
  //   if (window.confirm('Are you sure you want to delete this product?')) {
  //     const action = await dispatch(deleteProduct(product._id));
  //     // console.log('i am action', action.payload.message);

  //     if (deleteProduct.fulfilled.match(action)) {
  //       toast.success(action.payload.message);
  //     } else {
  //       toast.error(action.payload || 'Failed to delete product');
  //     }
  //   }
  // };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      width: '300px',

      showCancelButton: true,
      confirmButtonColor: '#3a3737',
      cancelButtonColor: '#3a3737',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      backdrop: true,
      allowOutsideClick: false,
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-confirm',
        cancelButton: 'custom-swal-cancel',
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      const action = await dispatch(deleteProduct(product._id));

      if (deleteProduct.fulfilled.match(action)) {
        Swal.fire('Deleted!', action.payload.message, 'success');
      } else {
        Swal.fire(
          'Error!',
          action.payload || 'Failed to delete product',
          'error'
        );
      }
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>

      <p className="product-price">${product.price}</p>

      <button style={{ color: 'black' }} onClick={handleDelete}>
        <FaTrash />
      </button>
      <button style={{ color: 'black' }} onClick={() => setShowModal(true)}>
        <FaEdit />
      </button>
      {showModal && (
        <UpdateProductModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;

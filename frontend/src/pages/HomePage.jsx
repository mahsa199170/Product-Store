import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, productSelector } from '@/slice/productSlice';
import ProductCard from '@/components/productCard/ProductCard';
import { Link } from 'react-router-dom';
import './Homepage.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products = [], status } = useSelector(productSelector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Current Products</h1>

      {status === 'loading' && <p className="loading">Loading products...</p>}

      {status === 'failed' && (
        <p className="error">
          Failed to load products. Please try again later.
        </p>
      )}

      {status === 'succeeded' && products.length === 0 && (
        <p className="no-products">
          No products found!! <Link to="/create">Create one now</Link>
        </p>
      )}

      {products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

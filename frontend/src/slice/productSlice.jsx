import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  status: 'idle', // can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      console.log('i am action', action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products.push(action.payload.data);
        } else {
          state.products = [action.payload.data];
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.products = state.products.filter((p) => p._id !== id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload.data;

        state.products = state.products.map((p) =>
          p._id === updated._id ? updated : p
        );
      });
  },
});

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//creating a new product

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || 'Failed to create product');
      }

      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//deleting a product

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (pid, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: 'DELETE' });
      const data = await res.json();
      console.log(data);
      if (!data.success) return rejectWithValue(data.message);
      return { id: pid, message: data.message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//updating a product

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ pid, updatedProduct }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!data.success) return rejectWithValue(data.message);
      console.log('updated data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productSelector = (state) => state.products;
export const { setProducts } = productSlice.actions;

export default productSlice.reducer;

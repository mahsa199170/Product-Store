const express = require('express');
const mongoose = require('mongoose');
const DB = require('./config/database');
require('dotenv').config();

const path = require('path');
const errorHandlingMiddleware = require('./middleware/errorHandlerMiddleware');

const app = express();

app.use(express.json());

const db = mongoose.connection;
DB();

app.use('/api/products', require('./routes/productsRoute'));

app.use(errorHandlingMiddleware);

// path to frontend/dist

const rootDir = path.resolve(__dirname, '..'); // one level up from backend

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootDir, 'frontend', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(rootDir, 'frontend', 'dist', 'index.html'));
  });
}
console.log('STATIC PATH:', path.join(rootDir, 'frontend', 'dist'));


db.once('open', () => {
  app.listen(process.env.PORT, () => {
    console.log(`app is listening on port ${process.env.PORT}`);
  });
});

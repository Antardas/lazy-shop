const express = require('express');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());
// Route Import
const product = require('./routes/productRoute');

app.use('/api/v1', product);

// Error Middleware
app.use(errorMiddleware);
module.exports = app;

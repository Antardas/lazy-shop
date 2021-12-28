const cookieParser = require('cookie-parser');
const express = require('express');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use(cookieParser());
// Route Import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
// Error Middleware note: every time errorMiddleware using last
app.use(errorMiddleware);
module.exports = app;

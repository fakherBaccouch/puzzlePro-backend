require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const connectDB = require('./config/connect_db.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const errorHandler = require('./config/error_handler');
const user = require('./routes/user_route')
const puzzle = require('./routes/puzzle_route')
const cart = require('./routes/cart_route')
const order = require('./routes/order_route')

app.use(bodyParser.json());

app.disable("x-powered-by");
app.use(cors());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(helmet());
app.use(express.json())
app.use(mongoSanitize())
app.set('trust proxy', 1)
app.use("/user",user)
app.use("/puzzle",puzzle)
app.use("/cart",cart)
app.use("/order",order)

app.use(errorHandler);

/*
app.use('/logenfs', (req, res) => {
  res.status(500).send({ "KONNECT_API_PAYMENTS_INIT_PAYMENT": process.env.KONNECT_API_PAYMENTS_INIT_PAYMENT, "KONNECT_API_PAYMENTS": process.env.KONNECT_API_PAYMENTS });

});*/






app.use((req, res) => {
  res.status(404).json({ error: 'page not found' })
})
const PORT = process.env.PORT || 3008;

connectDB();


app.listen(PORT, () => {
  console.log(`Server listning on port ${PORT}`);
});



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const notFoundMiddleware = require('./middleware/errorHandler');
const errorHandlerMiddleware = require('./middleware/notFound');
const verifyJWT = require("./middleware/verifyJWT")

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err))

const PORT = process.env.PORT || 4000;

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());
app.use(cors());

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);




app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}...`)
    );
 




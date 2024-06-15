const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const multer = require("multer")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require('path');
const cookieParser = require('cookie-parser');
const notFoundMiddleware = require('./middleware/errorHandler');
const errorHandlerMiddleware = require('./middleware/notFound');
const verifyJWT = require("./middleware/verifyJWT")
const PORT = process.env.PORT || 4000;


dotenv.config()
app.use(express.json())

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(bodyParser.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//middleware for cookies
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err))

  const storage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null, "images")
    },filename:(req,file,cb) => {
      cb(null, "health.png" /* req.body.name */)
    }
  })

  const upload = multer({storage: storage})
  app.post("/api/upload", upload.single("file"),(req,res) => {
    res.status(200).json("File has been uploaded")
  })

  app.use("/api/auth", authRoute)
  app.use("/api/users", userRoute)
  app.use("/api/posts", postRoute)
  app.use("/api/categories", categoryRoute)

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));


app.use(verifyJWT);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}...`)
    );
 


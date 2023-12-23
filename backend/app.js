const express  = require("express");
const connectToDb = require("./config/connactTodb");
const {errorHandler} = require("./middlewares/error");

const cors = require("cors");
require('dotenv').config()
connectToDb();

const app = express();

// app.use(xss())
app.use(express.json());

//Cors policy

app.use(cors({
    origin : "https://blog-app34.netlify.app",
    
}))




app.use("/api/auth",require("./routes/auth-route"));
app.use("/api/users",require("./routes/usersRoute"));
app.use("/api/posts",require("./routes/postsRoute"));
app.use("/api/comments",require("./routes/commentsRoute"));
app.use("/api/category",require("./routes/categoryRoute"));

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>console.log('sever is running in ${pro}'))


const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const morgan = require("morgan");
const BlogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = "mongodb+srv://aspoorna:poorna@blog.wmyaw.mongodb.net/my-blogs?retryWrites=true&w=majority&appName=blog"

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) - to avoid warnings

mongoose.connect(dbURI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log(`Server is running at 3000`));
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

//register view engine
app.set("view engine", "ejs");



//middleware & static files
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //all the url encoded data that passes that into object
app.use(morgan("dev"));


  
app.get("/", (req, res) => {
   res.redirect('/blogs')
});


app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});


//blogs
app.use('/blogs', BlogRoutes);

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

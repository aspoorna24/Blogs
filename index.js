
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Blog = require('./model/blog')
const morgan = require("morgan");


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
app.set("views",path.resolve("./views))


//middleware & static files
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //all the url encoded data that passes that into object
app.use(morgan("dev"));


  
app.get("/", (req, res) => {
   res.render("home",{title:"Home"});
});


app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});



app.get('/blogs', (req, res) =>{
  Blog.find().sort({createdAt:-1})
  .then((result)=>{
     res.render('index',{title:"All BLogs", blogs:result})
  })
  .catch((err)=>{
    console.log(err);
  })
});

app.post('/blogs',(req,res) =>{
  const blog = new Blog (req.body);
  
  blog.save()
  .then((result)=>{
    res.redirect('/');
  })
  .catch((err)=>{
    console.log(err)
  })
})

//blogs
app.get("/blogs/create",(req,res)=>{
  res.render("create", { title: "Create New Blog" });
});

app.get('/blogs/:id',(req,res) =>{
  const id = req.params.id;
  Blog.findById(id)
  .then(result =>{
    res.render('details',{blog: result, title: "Blog Details"} )
  })
  .catch((err)=>{
    console.log(err)
  })
})
  
app.delete('blogs/:id',(req,res) =>{
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/' });
    })
    .catch(err => {
      console.log(err);
    });
});



//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

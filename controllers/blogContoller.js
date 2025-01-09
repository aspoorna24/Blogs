const Blog = require("../model/blog")

const blog_index = (req, res) =>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
       res.render('index',{title:"All BLogs", blogs:result})
    })
    .catch((err)=>{
     console.log(err);
    })
}


const blog_details = (req,res) =>{
    const blog = new Blog (req.body);
  
      blog.save()
      .then((result)=>{
        res.redirect('/');
      })
      .catch((err)=>{
        console.log(err)
      })
}

const blog_create_post = (req,res)=>{
    res.render("create", { title: "Create New Blog" });
}

const blog_create_get = (req,res) =>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
      res.render('details',{blog: result, title: "Blog Details"} )
    })
    .catch((err)=>{
      console.log(err)
    })
}

const blog_delete = (req,res) =>{
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}
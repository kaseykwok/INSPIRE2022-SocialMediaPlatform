module.exports = app => {
    const blogs = require("../controllers/blogs.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", blogs.create);
  
    router.get("/user/:userId", blogs.getAllBlogsByUserId);
    
    router.get("/:id", blogs.getBlogById);
  
    app.use("/api/blogs", router);
  };
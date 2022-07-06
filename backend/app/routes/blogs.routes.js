module.exports = app => {
    const blogs = require("../controllers/blogs.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", blogs.create);
  
    router.get("/userid/:userId", blogs.getAllBlogsByUserId);
    
    router.get("/username/:username", blogs.getAllBlogsByUsername);

    router.get("/following/:userId", blogs.getAllFeedBlogsByUserId);
    
    router.get("/:id", blogs.getBlogById);
  
    app.use("/api/blogs", router);
  };
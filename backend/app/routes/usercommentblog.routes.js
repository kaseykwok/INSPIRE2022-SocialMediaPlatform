module.exports = app => {
    const usercommentblog = require("../controllers/usercommentblog.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", usercommentblog.comment);

    router.get("/getComments/:blogId", usercommentblog.getAllCommentsByBlogId);

    router.get("/getCommentCount/:blogId", usercommentblog.getCommentCount)

    router.delete("/:id", usercommentblog.deleteComment);
  
    app.use("/api/userCommentBlog", router);
  };
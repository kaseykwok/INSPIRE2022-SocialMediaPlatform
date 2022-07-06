module.exports = app => {
    const userlike = require("../controllers/userlike.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", userlike.like);

    router.get("/:userId/:blogId", userlike.getLikeState);

    router.get("/get/likeCount/:blogId", userlike.getLikeCount)

    router.delete("/:userId/:blogId", userlike.unlike);
  
    app.use("/api/userLike", router);
  };
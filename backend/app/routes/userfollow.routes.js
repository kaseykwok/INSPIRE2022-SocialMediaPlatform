module.exports = app => {
    const userfollow = require("../controllers/userfollow.controller.js");
  
    var router = require("express").Router();
  
    // Follow
    router.post("/", userfollow.create);

    router.get("/:userId/:followUserId", userfollow.getFollowState);

    router.delete("/:userId/:followUserId", userfollow.unfollow);
  
    app.use("/api/userfollow", router);
  };
module.exports = app => {
    const userfollow = require("../controllers/userfollow.controller.js");
  
    var router = require("express").Router();
  
    // Follow
    router.post("/", userfollow.create);
  
    app.use("/api/userfollow", router);
  };
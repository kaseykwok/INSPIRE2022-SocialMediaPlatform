module.exports = app => {
    const entrepreneurship = require("../controllers/entrepreneurship.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", entrepreneurship.create);
  
    router.get("/", entrepreneurship.getAllEntrepreneurship);
  
    app.use("/api/entrepreneurship", router);
  };
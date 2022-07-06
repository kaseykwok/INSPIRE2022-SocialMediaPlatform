module.exports = app => {
    const entrepreneurship = require("../controllers/entrepreneurship.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", entrepreneurship.create);
  
    router.get("/", entrepreneurship.getAllEntrepreneurship);

    router.get("/get/:id", entrepreneurship.getEntrepreneurById);

    router.get("/search/:keyword", entrepreneurship.searchEntrepreneurshipsByKeyword)
  
    app.use("/api/entrepreneurship", router);
  };
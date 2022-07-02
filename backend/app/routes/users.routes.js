module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.create);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", users.getUserById);

    router.get("/username/:username", users.getUserByUsername);
  
    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    app.use("/api/users", router);
  };
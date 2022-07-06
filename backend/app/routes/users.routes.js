const { user } = require("pg/lib/defaults");

module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", users.create);
  
    router.get("/:id", users.getUserById);

    router.get("/username/:username", users.getUserByUsername);

    router.get("/search/user", users.searchUserByKeyword);
  
    router.put("/:id", users.update);
  
    app.use("/api/users", router);
  };
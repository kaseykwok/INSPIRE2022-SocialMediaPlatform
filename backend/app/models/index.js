const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.model.js")(sequelize, Sequelize);
db.blogs = require("./blogs.model.js")(sequelize, Sequelize);
db.entrepreneurship = require("./entrepreneurship.model.js")(sequelize, Sequelize);
db.userfollow = require('./userfollow.model')(sequelize, Sequelize);

db.users.hasMany(db.blogs);
db.blogs.belongsTo(db.users);

db.users.hasMany(db.entrepreneurship);
db.entrepreneurship.belongsTo(db.users);

module.exports = db;
module.exports = (sequelize, Sequelize) => {
    const UserLike = sequelize.define("userlike", {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        blogId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });

    return UserLike
};
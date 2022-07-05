module.exports = (sequelize, Sequelize) => {
    const UserFollow = sequelize.define("userfollow", {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        followUserId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });

    return UserFollow
};
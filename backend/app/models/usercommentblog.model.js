module.exports = (sequelize, Sequelize) => {
    const UserCommentBlog = sequelize.define("usercommentblog", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        blogId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        comment: {
            type: Sequelize.STRING(512),
            allowNull: false
        }
    });

    return UserCommentBlog
};
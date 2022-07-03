module.exports = (sequelize, Sequelize) => {
    const Blogs = sequelize.define("blogs", {
        description: {
            type: Sequelize.STRING(512)
        },
    });

    return Blogs;
};
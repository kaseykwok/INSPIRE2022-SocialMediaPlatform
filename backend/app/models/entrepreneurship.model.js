module.exports = (sequelize, Sequelize) => {
    const Entrepreneurship = sequelize.define("entrepreneurship", {
        title: {
            type: Sequelize.STRING(512),
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING(512)
        },
        imageURL: {
            type: Sequelize.STRING(512)
        },
        targetAmount: {
            type: Sequelize.INTEGER
        }
    });

    return Entrepreneurship;
};
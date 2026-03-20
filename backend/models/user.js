const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const user = sequelize.define(
    'user',
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "student"),
            defaultValue: "student",
        },
    },
);

module.exports = { user }
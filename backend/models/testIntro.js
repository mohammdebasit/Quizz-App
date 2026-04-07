const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const testIntro = sequelize.define(
    'testIntro',
    {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descrip: {
            type: DataTypes.TEXT,
            // allowNull defaults to true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    },
);

module.exports = { testIntro }
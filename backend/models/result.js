const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const result = sequelize.define(
    'result',
    {
        // Model attributes are defined here
        correctAsn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalQues: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        percentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
);

module.exports = { result }
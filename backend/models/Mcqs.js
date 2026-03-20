const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Mcq = sequelize.define(
    'Mcq',
    {
        // Model attributes are defined here
        ques: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        op1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        op2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        op3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        op4: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correctOp: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
);

module.exports = { Mcq }
const { DataTypes: DataTypes_Theater } = require('sequelize');
const sequelize_Theater = require('../config/database');
const Theater_model = sequelize_Theater.define('Theater', { theater_id: { type: DataTypes_Theater.INTEGER, autoIncrement: true, primaryKey: true }, name: { type: DataTypes_Theater.STRING, allowNull: false }, city: { type: DataTypes_Theater.STRING, allowNull: false }, address: { type: DataTypes_Theater.STRING } }, { tableName: 'Theaters', timestamps: false });
module.exports = Theater_model;
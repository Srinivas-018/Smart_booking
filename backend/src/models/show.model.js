const { DataTypes: DataTypes_Show } = require('sequelize');
const sequelize_Show = require('../config/database');
const Show_model = sequelize_Show.define('Show', { show_id: { type: DataTypes_Show.INTEGER, autoIncrement: true, primaryKey: true }, show_time: { type: DataTypes_Show.DATE, allowNull: false }, base_price: { type: DataTypes_Show.DECIMAL(10, 2), allowNull: false }, screen_name: { type: DataTypes_Show.STRING } }, { tableName: 'Shows', timestamps: false });
module.exports = Show_model;
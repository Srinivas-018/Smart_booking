const { DataTypes: DataTypes_Review } = require('sequelize');
const sequelize_Review = require('../config/database');
const Review_model = sequelize_Review.define('Review', { review_id: { type: DataTypes_Review.INTEGER, autoIncrement: true, primaryKey: true }, rating: { type: DataTypes_Review.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }, comment: { type: DataTypes_Review.TEXT } }, { tableName: 'Reviews', timestamps: true });
module.exports = Review_model;
const { DataTypes: DataTypes_BS } = require('sequelize');
const sequelize_BS = require('../config/database');
const BookingSeat_model = sequelize_BS.define('BookingSeat', { booking_seat_id: { type: DataTypes_BS.INTEGER, autoIncrement: true, primaryKey: true }, seat_identifier: { type: DataTypes_BS.STRING, allowNull: false } }, { tableName: 'BookingSeats', timestamps: false });
module.exports = BookingSeat_model;
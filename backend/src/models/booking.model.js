const { DataTypes: DataTypes_Booking } = require('sequelize');
const sequelize_Booking = require('../config/database');
const Booking_model = sequelize_Booking.define('Booking', { booking_id: { type: DataTypes_Booking.INTEGER, autoIncrement: true, primaryKey: true }, status: { type: DataTypes_Booking.ENUM('pending', 'confirmed', 'cancelled'), defaultValue: 'pending' }, total_amount: { type: DataTypes_Booking.DECIMAL(10, 2) }, expires_at: { type: DataTypes_Booking.DATE } }, { tableName: 'Bookings', timestamps: true });
module.exports = Booking_model;

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const LoginHistory = sequelize.define('LoginHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
    },
    userAgent: {
      type: DataTypes.STRING(512),
    },
    status: {
      type: DataTypes.ENUM('success', 'failure'),
      allowNull: false,
    }
  }, {
    tableName: 'login_history',
    timestamps: true,
  });

  LoginHistory.associate = (models) => {
    // Assumes you have a 'User' model
    LoginHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return LoginHistory;
};
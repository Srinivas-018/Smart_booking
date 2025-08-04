'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('login_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Can be null if login fails because user doesn't exist
        references: {
          model: 'Users', // This should be the name of your users table
          key: 'id',   // This should be the primary key of your users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ipAddress: {
        type: Sequelize.STRING
      },
      userAgent: {
        type: Sequelize.STRING(512)
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('success', 'failure')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('login_history');
  }
};
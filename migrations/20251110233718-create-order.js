'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW') // Guarda la fecha actual
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pagado' // Se asume que están pagadas
      },
      user_run: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'run'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
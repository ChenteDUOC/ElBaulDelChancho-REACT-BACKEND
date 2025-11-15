'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      // En lugar de 'id', usamos 'run' como la llave primaria
      run: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Asegura que no se puedan registrar dos usuarios con el mismo email
      },
      fechaNacimiento: {
        type: Sequelize.DATE,
        allowNull: true // Permitimos que sea opcional
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comuna: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direccion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipoUsuario: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'cliente' // Por defecto, todos son 'cliente'
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
    // El método 'down' es para revertir los cambios
    await queryInterface.dropTable('Users');
  }
};
'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('db_usuarios', {
      id_usuario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido_paterno: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido_materno: {
        type: Sequelize.STRING,
        allowNull: true
      },
      usuario: {
        type: Sequelize.STRING,
        unique: false
      },
      contrasenia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
      },
      genero: {
        type: Sequelize.ENUM('Hombre', 'Mujer', 'No definido')
      },
      estado_civil: {
        type: Sequelize.ENUM('Soltero', 'Casado', 'Divorciado', 'Viudo')
      },
      estatus: {
        type: Sequelize.TINYINT,
        defaultValue: 1
      }
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('db_usuarios')
  }
}

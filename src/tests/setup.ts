import { sequelize } from '../database/config'

// Configuración global para los tests
beforeAll(async () => {
  // Asegurar que la conexión esté establecida antes de los tests
  try {
    await sequelize.authenticate()
  } catch (error) {
    console.warn('Database connection warning:', error)
  }
})

afterAll(async () => {
  // Cerrar todas las conexiones de manera segura
  try {
    await sequelize.close()
  } catch (error) {
    console.warn('Database close warning:', error)
  }
})

// Manejar señales de terminación
process.on('SIGINT', async () => {
  try {
    await sequelize.close()
    process.exit(0)
  } catch (error) {
    console.error('Error closing database:', error)
    process.exit(1)
  }
})

process.on('SIGTERM', async () => {
  try {
    await sequelize.close()
    process.exit(0)
  } catch (error) {
    console.error('Error closing database:', error)
    process.exit(1)
  }
})

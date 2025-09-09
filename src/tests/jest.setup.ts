// Configuración inicial para Jest
process.env.NODE_ENV = 'test'

// Suprimir logs durante los tests
const originalConsoleLog = console.log
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

console.log = (...args: any[]) => {
  // Suprimir logs de base de datos y conexiones
  const message = args[0]?.toString() || ''
  if (
    !message.includes('MIN_CONNECTION') && 
    !message.includes('MAX_CONNECTION') &&
    !message.includes('ACQUIRE') &&
    !message.includes('IDLE') &&
    !message.includes('DB_EVICT') &&
    !message.includes('Conexion') &&
    !message.includes('Executing (default)')
  ) {
    originalConsoleLog(...args)
  }
}

console.error = (...args: any[]) => {
  // Suprimir errores de conexión a BD
  const message = args[0]?.toString() || ''
  if (
    !message.includes('Conexion fallida') && 
    !message.includes('Encoding not recognized') &&
    !message.includes('cesu8')
  ) {
    originalConsoleError(...args)
  }
}

console.warn = (...args: any[]) => {
  // Suprimir warnings de base de datos
  const message = args[0]?.toString() || ''
  if (!message.includes('Database')) {
    originalConsoleWarn(...args)
  }
}

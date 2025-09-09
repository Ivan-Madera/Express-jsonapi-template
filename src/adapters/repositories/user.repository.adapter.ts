import User from '../../database/models/User.model'
import { type UserRepositoryPort } from '../../domain/ports/user.ports'

export const createUserRepositoryAdapter = (): UserRepositoryPort => ({
  findAll: async () => {
    return await User.findAll()
  },

  findOne: async (usuario: string, attributes?: string[]) => {
    return await User.findOne({
      where: { usuario },
      attributes
    })
  },

  create: async (userData, transaction) => {
    return await User.create(userData, { transaction })
  },

  update: async (values, options) => {
    const result = await User.update(values, options)
    return result[0] // Retorna solo el número de filas afectadas
  }
})

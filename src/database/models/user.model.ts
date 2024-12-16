import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '../config'

interface UserAttributes {
  id_usuario: number
  nombres: string
  apellido_paterno: string
  apellido_materno: string
  usuario: string
  contrasenia: string
  correo: string
  telefono: string
  genero: string
  estado_civil: string
  estatus: number
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id_usuario' | 'estatus'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>(
  'db_usuarios',
  {
    id_usuario: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    nombres: {
      type: DataTypes.STRING
    },
    apellido_paterno: {
      type: DataTypes.STRING
    },
    apellido_materno: {
      type: DataTypes.STRING
    },
    usuario: {
      type: DataTypes.STRING
    },
    contrasenia: {
      type: DataTypes.STRING
    },
    correo: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.STRING
    },
    genero: {
      type: DataTypes.STRING
    },
    estado_civil: {
      type: DataTypes.STRING
    },
    estatus: {
      type: DataTypes.TINYINT
    }
  },
  {
    timestamps: false,
    tableName: 'db_usuarios'
  }
)

export default User

import { DataTypes, InstanceDestroyOptions, Model, Optional } from 'sequelize'
import Config from '../config/database/Config'

interface ApplicationAttributes {
  id: number
  hash: string
  name?: string
  comment?: string
  status: 'Sûre' | 'Virus' | 'En cours de vérification'
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ApplicationInput extends Optional<ApplicationAttributes, 'id' | 'hash'> {}
export interface ApplicationOutput extends Required<ApplicationAttributes> {}

export default class Application extends Model<ApplicationAttributes, ApplicationInput> implements ApplicationAttributes {
    public id: number
    public userId: number
    public hash: string
    public name: string
    public comment: string
    public status: 'Sûre' | 'Virus' | 'En cours de vérification'
  
    // timestamps!
    public readonly createdAt: Date
    public readonly updatedAt: Date
    public readonly deletedAt: Date
  }
  
  Application.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Sûre', 'Virus', 'En cours de vérification'],
      allowNull: false
    }
  }, {
    timestamps: true,
    sequelize: new Config().sequelize
  })
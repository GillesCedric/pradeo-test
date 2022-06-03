import { DataTypes, InstanceDestroyOptions, Model, Optional } from 'sequelize'
import Config from '../config/database/Config'

/**
 * @interface ApplicationAttributes
 * @author Gilles Cédric
 * @description this interface is used to define the attributes for the Application Model
 * @since 22/05/2022
 */
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

/**
 * @interface ApplicationInput
 * @author Gilles Cédric
 * @description this interface is used to define the input attributes for the Application Model
 * @extends Optional
 * @exports
 * @since 22/05/2022
 */
export interface ApplicationInput extends Optional<ApplicationAttributes, 'id' | 'hash'> {}

/**
 * @interface ApplicationOutput
 * @author Gilles Cédric
 * @description this interface is used to define the output attributes for the Application Model
 * @extends Required
 * @exports
 * @since 22/05/2022
 */
export interface ApplicationOutput extends Required<ApplicationAttributes> {}

/**
 * @interface Application
 * @author Gilles Cédric
 * @description this class is the Model of the Applications table
 * @extends Model
 * @exports
 * @default
 * @since 22/05/2022
 */
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
  
  //Initialization of the model
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
import { Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, Model, Optional } from 'sequelize'
import Config from '../config/database/Config'
import Application from './Application'

/**
 * @interface UserAttributes
 * @author Gilles Cédric
 * @description this interface is used to define the attributes for the Application Model
 * @since 21/05/2022
 */
interface UserAttributes {
  id: number
  username: string
  email: string
  password: string
  avatar?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

/**
 * @class UserInput
 * @author Gilles Cédric
 * @description this interface is used to define the input attributes for the User Model
 * @extends Optional
 * @exports
 * @since 21/05/2022
 */
export interface UserInput extends Optional<UserAttributes, 'id' | 'avatar'> { }

/**
 * @class App
 * @author Gilles Cédric
 * @description this interface is used to define the input attributes for the Application Model
 * @extends Required
 * @exports
 * @since 21/05/2022
 */
export interface UserOutput extends Required<UserAttributes> { }

/**
 * @class User
 * @author Gilles Cédric
 * @description this class is the Model of the Users table
 * @exports
 * @default
 * @since 21/05/2022
 */
export default class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id: number
  public username: string
  public email: string
  public password: string
  public avatar?: string

  // timestamps!
  public readonly createdAt: Date
  public readonly updatedAt: Date
  public readonly deletedAt: Date

  public getApplications: HasManyGetAssociationsMixin<Application> // Note the null assertions!
  public addApplication: HasManyAddAssociationMixin<Application, number>
  public hasApplication: HasManyHasAssociationMixin<Application, number>
  public countApplications: HasManyCountAssociationsMixin
  public createApplication: HasManyCreateAssociationMixin<Application>

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly applications?: Application[] // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    applications: Association<User, Application>
  }
  
}

//Initialization of the model
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'default.png'
  }
}, {
  timestamps: true,
  sequelize: new Config().sequelize
})

User.hasMany(Application)

Application.belongsTo(User)
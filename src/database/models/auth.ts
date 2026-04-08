import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt?: Date;
  declare deletedAt?:  Date;
  declare avatar?: string 
}

export const initModelAuth = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUID,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};
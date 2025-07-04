import { Sequelize, DataTypes, ModelDefined, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

export const UserModel = (
  sequelize: Sequelize
): ModelDefined<UserAttributes, UserCreationAttributes> =>
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

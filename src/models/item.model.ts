import { DataTypes, Sequelize, ModelDefined, Optional } from "sequelize";

interface ItemAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

type ItemCreationAttributes = Optional<ItemAttributes, "id">;

export const ItemModel = (
  sequelize: Sequelize
): ModelDefined<ItemAttributes, ItemCreationAttributes> =>
  sequelize.define("Item", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }
  });

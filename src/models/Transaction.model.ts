import { Sequelize, DataTypes, ModelDefined, Optional } from "sequelize";

export type TransactionType = 'BUY' | 'TRADE';

interface TransactionAttributes {
    id: number;
    buyerId: number;
    sellerId: number;
    itemId: number;
    type: TransactionType;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id' | 'status'>;

export const TransactionModel = (
    sequelize: Sequelize
): ModelDefined<TransactionAttributes, TransactionCreationAttributes> => sequelize.define("Transaction", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    buyerId: { type: DataTypes.INTEGER, allowNull: false },
    sellerId: { type: DataTypes.INTEGER, allowNull: false },
    itemId: { type: DataTypes.INTEGER, allowNull: false },
    type: {
        type: DataTypes.ENUM('BUY', 'TRADE'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELLED'),
        defaultValue: 'PENDING'
    }
});

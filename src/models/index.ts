import { Sequelize } from "sequelize";
import { dbConfig } from "../config/db.config";
import { ItemModel } from "./item.model";
import { UserModel } from './User.model';
import { TransactionModel } from './Transaction.model';


const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'postgres',
    port: dbConfig.port || 5432, // optional if port is custom
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // set to false for self-signed certs
      }
    }
  }
);

// Initialize models
const Item = ItemModel(sequelize);
const User = UserModel(sequelize);
const Transaction = TransactionModel(sequelize);

// Sync DB
sequelize.sync({ alter: true });

export { sequelize, Item, User, Transaction };

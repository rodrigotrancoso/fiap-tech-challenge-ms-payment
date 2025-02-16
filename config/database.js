import dotenv from "dotenv";

dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.postgres_host || 'localhost',
  port: process.env.postgres_port || 5432,
  database: process.env.postgres_database || 'fiapdb',
  username: process.env.postgres_user || 'admin',
  password: process.env.postgres_password || 'admin123',
  logging: false
});

export default sequelize;

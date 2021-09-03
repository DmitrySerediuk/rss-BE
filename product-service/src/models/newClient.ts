import { Client } from 'pg';

const {DB_HOST, DB_PORT, DB_BASE, DB_USER, DB_PWD} = process.env;

const dbOptions = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_BASE,
  user: DB_USER,
  password: DB_PWD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};
const client = new Client(dbOptions);

export {client}
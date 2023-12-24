import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const itemsPool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_URI,
  ssl: { rejectUnauthorized: false },

});

export const connectPostGres = async () => {
  try {
    await itemsPool.connect();
    console.log("Connected to PostGres");
  } catch (error) {
    console.error("Error connecting to PostGres:", error);
  }
};
export const newUser = async (name: string, password: string) => {
const data2 =  await itemsPool.query(`
INSERT INTO users (username, user_password)
 VALUES ('${name}','${password}');
`);
};

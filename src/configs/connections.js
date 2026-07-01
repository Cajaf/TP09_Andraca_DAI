import pkg from "pg";
import config from "../configs/db-config.js";

const { Pool } = pkg;
const pool = new Pool(config);

export default pool;
import pkg from "pg";
import config from "../configs/db-config.js";

const { Pool } = pkg;

export default class UserRepository {
  constructor() {
    this.DBPool = new Pool(config);
  }

  findByEmail = async (email) => {
    try {
      const sql = "SELECT * FROM usuarios WHERE email = $1";
      const result = await this.DBPool.query(sql, [email]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createUser = async (nombreCompleto, email, nombreUsuario, hashedPassword) => {
    try {
      const sql = `
        INSERT INTO usuarios (nombrecompleto, email, nombreusuario, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, nombrecompleto, email, nombreusuario
      `;
      const values = [nombreCompleto, email, nombreUsuario, hashedPassword];
      const result = await this.DBPool.query(sql, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

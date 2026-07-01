import bcrypt from "bcrypt";
import UserRepository from "../repositories/user-repository.js";
import { generateToken } from "../helpers/jwt.js";

export default class AuthService {
  constructor() {
    this.repository = new UserRepository();
  }

  registerAsync = async (nombreCompleto, email, nombreUsuario, password) => {
    const existing = await this.repository.findByEmail(email);
    if (existing) throw new Error("Usuario ya existe");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.repository.createUser(
      nombreCompleto,
      email,
      nombreUsuario,
      hashedPassword
    );

    const token = generateToken({ id: newUser.id, email: newUser.email });
    return { token, user: newUser };
  };

  loginAsync = async (email, password) => {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Contraseña incorrecta");

    const token = generateToken({ id: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, nombreusuario: user.nombreusuario } };
  };
}

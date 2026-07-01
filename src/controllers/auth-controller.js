import { StatusCodes } from "http-status-codes";
import AuthService from "../services/auth-service.js";

const currentService = new AuthService();

export const register = async (req, res) => {
  const { nombreCompleto, email, nombreUsuario, password } = req.body;
  try {
    const result = await currentService.registerAsync(nombreCompleto, email, nombreUsuario, password);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await currentService.loginAsync(email, password);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};

import bcrypt from "bcrypt";
import environment from "../config/env.config";

export default function hashPassword(password) {
  return bcrypt.hash(password, environment.saltRounds);
}

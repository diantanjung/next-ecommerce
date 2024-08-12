import { Env } from "./constants";
import bcrypt from "bcrypt"

const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, Env.SALT_ROUND);
}

export default hashPassword;
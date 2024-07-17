import bcrypt from "bcrypt";
import { Env } from "./constants";

const hashPassword = (password: string) => {
    let salt_round = 0;
    if (typeof Env.SALT_ROUND == "string") {
        salt_round = parseInt(Env.SALT_ROUND);
    }
    const salt = bcrypt.genSaltSync(salt_round);
    return bcrypt.hashSync(password, salt);
}

export default hashPassword;
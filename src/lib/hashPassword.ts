import { hashSync } from 'bcrypt-ts-edge'

import { Env } from "./constants";

const hashPassword = (password: string) => {
    let salt_round = 0;
    if (typeof Env.SALT_ROUND == "string") {
        salt_round = parseInt(Env.SALT_ROUND);
    }
    return hashSync(password, salt_round);
}

export default hashPassword;
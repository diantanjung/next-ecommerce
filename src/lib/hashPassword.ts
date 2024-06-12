import bcrypt from "bcrypt";

function parseEnvToInt(key: keyof Environment) {
    const env = process.env[key];
    if (typeof env == "string") {
        return parseInt(env);
    }
    return 0;
}

const hashPassword = (password: string) => {
    const salt_round = parseEnvToInt("SALT_ROUND");
    const salt = bcrypt.genSaltSync(salt_round);
    return bcrypt.hashSync(password, salt);
}

export default hashPassword;
declare global {
  interface Environment {
    DATABASE_URL?: string;
    SALT_ROUND?: string;
  }
}

namespace NodeJS {
  interface ProcessEnv extends Environment {}
}

export {};
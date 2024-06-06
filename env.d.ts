declare global {
  interface Test {
    DATABASE_URL?: string;
    SALT_ROUND?: string;
  }
}

namespace NodeJS {
  interface ProcessEnv extends Test {}
}

export {};

// Todo: 
// TSError: ⨯ Unable to compile TypeScript:
// prisma/seed.ts:11:35 - error TS2304: Cannot find name 'Test'.

declare global {
    export interface Test {
        DATABASE_URL?: string;
        SALT_ROUND?: string;
    }

    namespace NodeJS {
        interface ProcessEnv extends Test {
            // DATABASE_URL?: string;
            // SALT_ROUND?: string;
        }
      }  
}


export { }
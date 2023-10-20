import { PrismaClient } from '@prisma/client';
import { url } from '../constants';

// class Connection {
//     private url: string;
//     private static connection: PrismaClient;

//     private constructor() {
//         this.url = `${process.env.DATABASE_URL}`;
//     }

//     public static getInstance(): PrismaClient {
//         if (!this.connection) {
//             this.connection = new PrismaClient({
//                 datasources: {
//                     db: {
//                         url: this.url
//                     }
//                 }
//             });
//         }

//         return this.connection;
//     }
    
// }

const prisma = {
    instance: new PrismaClient({
        datasources: {
            db: { url }
        }
    }),
};
  
export type db = typeof prisma;
Object.freeze(prisma);

export { prisma };
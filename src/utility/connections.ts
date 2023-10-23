import { PrismaClient } from '@prisma/client';
import { url } from '../constants';

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
import path from 'path';

const url = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:${process.env.POSTGRES_PORT}/challenge?schema=public`;
const dir = `${__dirname}/public/`;
export {
    url,
    dir
}
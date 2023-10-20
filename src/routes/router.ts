import { Router } from 'express';
import { utilsRouter } from './utils.routes';

const router = Router();

router.use('/utils', utilsRouter);

export { router };
import { Router } from 'express';
import { utilsRouter } from './utils.routes';
import { studentsRouter } from './students.routes';

const router = Router();

router.use('/utils', utilsRouter);
router.use('/students', studentsRouter);

export { router };
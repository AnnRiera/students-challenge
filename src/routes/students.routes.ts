import { Router } from "express";
import { StudentsController } from '../controllers/students.controller';

const studentsRouter = Router();
const studentsController = new StudentsController();

studentsRouter.get('/report', studentsController.getStudentsAttendance);

export { studentsRouter };
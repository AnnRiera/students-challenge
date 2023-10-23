import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { StudentsService } from '../services/students.service';

const studentsService = new StudentsService();

class StudentsController extends BaseController {
    public async getStudentsAttendance(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = await studentsService.getReportPerStudent();
            return res.status(200).json({ data });
        } catch (error) {
            return next(error);
        }
    };
}

export { StudentsController };
import { Request, Response, NextFunction } from 'express';
import { UtilsService } from '../services/utils.service';

const utilsService = new UtilsService();

class UtilsController {
    public async uploadFileAndInsert(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await utilsService.uploadFileAndInsert(req);
            res.status(200).json({ message: result });
        } catch (error) {
            console.error(error);
            return next(error);
        }
    };
}

export { UtilsController };
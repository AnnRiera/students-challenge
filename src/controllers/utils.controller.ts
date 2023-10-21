import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base.controller";
import { UtilsService } from "../services/utils.service";

const utilsService = new UtilsService();

class UtilsController extends BaseController {
    public async uploadFileAndInsert(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await utilsService.uploadFileAndInsert(req);
            return res.status(200).json({ message: result });
        } catch (err) {
            console.log(err);
            return next(new Error()); 
        }
        
    };
}

export { UtilsController };
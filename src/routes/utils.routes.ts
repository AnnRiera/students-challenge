import { Router } from "express";
import { UtilsController } from '../controllers/utils.controller';

const utilsRouter = Router();
const utilsController = new UtilsController();

utilsRouter.post('/upload-file', utilsController.uploadFileAndInsert);

export { utilsRouter };
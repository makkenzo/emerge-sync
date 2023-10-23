import { Router } from 'express';
import * as DocumentController from '../controllers/document.controller';

const documentRouter = Router();

documentRouter.get('/get-document/:id', DocumentController.getDocument);

export default documentRouter;

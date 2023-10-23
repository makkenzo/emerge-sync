import { Router } from 'express';
import * as DocumentController from '../controllers/document.controller';

const documentRouter = Router();

documentRouter.get('/get-document/:id', DocumentController.getDocument);
documentRouter.post('/add-document', DocumentController.addDocument);

export default documentRouter;

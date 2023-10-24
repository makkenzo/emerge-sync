import { Router } from 'express';
import * as DocumentController from '../controllers/document.controller';

const documentRouter = Router();

documentRouter.get('/get-document/:id', DocumentController.getDocument);
documentRouter.get('/get-documents', DocumentController.getAllDocuments);

documentRouter.post('/add-document', DocumentController.addDocument);

documentRouter.delete('/delete-document/:id', DocumentController.deleteDocument);

export default documentRouter;

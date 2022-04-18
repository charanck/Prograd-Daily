import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.js';

import { getAllFeedbacks , createFeedback ,deleteFeedback} from '../controller/feedbackController.js';

export const feedbackRouter = express.Router();

feedbackRouter.get('/',authenticateUser,getAllFeedbacks);

feedbackRouter.post("/",createFeedback);

feedbackRouter.delete('/:feedbackId',deleteFeedback);



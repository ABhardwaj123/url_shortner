import express from 'express';
import { getUrlAnalytics } from './analytics.controllers.js';
import { verifyJWT } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/:urlId', verifyJWT, getUrlAnalytics);

export default router;
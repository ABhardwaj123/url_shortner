import express from 'express';
import { createUrl, getMyUrls } from './url.controller.js';
import { verifyJWT } from '../auth/auth.middleware.js';

const router = express.Router();

router.post('/', verifyJWT, createUrl);
router.get('/', verifyJWT, getMyUrls);

export default router;
import express from 'express';
import { createUrl, getMyUrls } from './url.controller.js';
import { verifyJWT } from '../auth/auth.middleware.js';
import { verifyApiKey } from '../apikeys/apiKey.middleware.js';
import { rateLimiter } from '../rateLimiter/rateLimiter.middleware.js';

const router = express.Router();

router.post('/', verifyJWT, createUrl);
router.get('/', verifyJWT, getMyUrls);

router.post('/via-key' , verifyApiKey , rateLimiter , createUrl)

export default router;
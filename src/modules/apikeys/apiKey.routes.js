import express from 'express';
import { createKey , getMyKeys } from './apiKey.controllers.js'
import { verifyJWT } from '../auth/auth.middleware.js';


const router = express.Router();

router.post('/', verifyJWT , createKey);
router.get('/', verifyJWT , getMyKeys);

export default router;
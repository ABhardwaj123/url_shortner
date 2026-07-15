import express from 'express';
import { redirectToOriginalUrl } from './redirect.controller.js'

const router = express.Router()

router.get('/:shortCode' , redirectToOriginalUrl)

export default router;
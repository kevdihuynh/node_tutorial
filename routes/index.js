import express from "express";
import apis from './api/index.js';

var router = express.Router();

router.use('/api', apis);

export default router;

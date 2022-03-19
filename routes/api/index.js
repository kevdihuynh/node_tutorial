import express from "express";
import search from './search.js';

var router = express.Router();
router.use('/search', search);

export default router;
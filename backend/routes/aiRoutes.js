const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/chat', aiController.chat);
router.post('/generate-roadmap', aiController.generateRoadmap);
router.post('/generate-tasks-from-notes', aiController.generateTasksFromNotes);

module.exports = router;

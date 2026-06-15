const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');

router.post('/', workspaceController.createWorkspace);
router.get('/', workspaceController.getMyWorkspaces);

module.exports = router;

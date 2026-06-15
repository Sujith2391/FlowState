const Workspace = require('../models/Workspace');

exports.createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;
    const ownerId = req.user.userId;

    const workspace = new Workspace({
      name,
      owner: ownerId,
      members: [ownerId] // Owner is automatically a member
    });

    await workspace.save();
    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workspace' });
  }
};

exports.getMyWorkspaces = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Find workspaces where user is owner OR in members array
    const workspaces = await Workspace.find({
      $or: [{ owner: userId }, { members: userId }]
    });
    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workspaces' });
  }
};

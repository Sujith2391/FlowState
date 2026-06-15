const Task = require('../models/Task');

exports.getAnalyticsOverview = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    if (!workspaceId) {
      return res.status(400).json({ error: 'Workspace ID is required' });
    }

    // Aggregate task counts by status for this workspace
    const statusCounts = await Task.aggregate([
      { $match: { workspaceId: require('mongoose').Types.ObjectId(workspaceId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const totalTasks = await Task.countDocuments({ workspaceId });
    
    // Convert array [{_id: 'Done', count: 5}, ...] to an easy object
    const statusMap = { 'Todo': 0, 'In Progress': 0, 'Done': 0 };
    statusCounts.forEach(s => { statusMap[s._id] = s.count });

    res.json({
      totalTasks,
      todo: statusMap['Todo'],
      inProgress: statusMap['In Progress'],
      done: statusMap['Done'],
      timeSavedEstimate: Math.floor(totalTasks * 1.5) // Fake metric for SaaS flavor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate analytics' });
  }
};

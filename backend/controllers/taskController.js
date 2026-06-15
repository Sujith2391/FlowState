const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    if (!workspaceId) return res.status(400).json({ error: 'Workspace ID required' });
    
    const tasks = await Task.find({ workspaceId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, priority, status, date, workspaceId } = req.body;
    if (!workspaceId) return res.status(400).json({ error: 'Workspace ID required' });

    const task = new Task({ title, priority, status, date, workspaceId, creatorId: req.user.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, status, date } = req.body;
    
    const task = await Task.findByIdAndUpdate(
      id, 
      { title, priority, status, date },
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

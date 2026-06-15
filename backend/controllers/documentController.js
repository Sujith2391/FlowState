const Document = require('../models/Document');

exports.getDocuments = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    if (!workspaceId) return res.status(400).json({ error: 'Workspace ID required' });
    
    const docs = await Document.find({ workspaceId }).sort({ updatedAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

exports.createDocument = async (req, res) => {
  try {
    const { title, content, type, workspaceId } = req.body;
    if (!workspaceId) return res.status(400).json({ error: 'Workspace ID required' });

    const doc = new Document({ 
      title, 
      content, 
      type, 
      workspaceId, 
      creatorId: req.user.userId 
    });
    
    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create document' });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type } = req.body;
    
    const doc = await Document.findByIdAndUpdate(
      id, 
      { title, content, type }, 
      { new: true }
    );
    
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document' });
  }
};

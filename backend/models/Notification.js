const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Optional: If null, broadcast to entire workspace
}, { timestamps: true });

notificationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Notification', notificationSchema);

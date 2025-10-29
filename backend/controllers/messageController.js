const Message = require('../models/Message');
const JobPost = require('../models/JobPost'); // ✅ ADD THIS

exports.sendMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const query = {};
    if (senderId) query.sender = senderId;
    if (receiverId) query.receiver = receiverId;

    const messages = await Message.find(query)
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort('sentAt');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ NEW: Get Chat Messages for Job
exports.getChatMessages = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const job = await JobPost.findById(jobId).populate('creator');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    let recipientId;
    if (req.user.role === 'caregiver') {
      recipientId = job.creator._id;
    } else {
      const application = job.applications.find(app => 
        app.status === 'interview' || app.status === 'accepted'
      );
      if (!application) {
        return res.status(404).json({ message: 'No active application found' });
      }
      recipientId = application.caregiver;
    }

    const messages = await Message.find({
      jobPost: jobId,
      $or: [
        { sender: req.user.id, receiver: recipientId },
        { sender: recipientId, receiver: req.user.id }
      ]
    })
    .populate('sender', 'name role')
    .sort({ sentAt: 1 });

    res.json({
      messages: messages.map(msg => ({
        id: msg._id,
        sender: req.user.id.toString() === msg.sender._id.toString() ? 'caregiver' : 'family',
        message: msg.text,
        timestamp: msg.sentAt.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        status: msg.status || 'read',
        type: msg.messageType || 'text'
      })),
      familyInfo: {
        name: job.creator.name,
        avatar: job.creator.name.split(' ').map(n => n[0]).join(''),
        isOnline: true
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ NEW: Send Message for Job
exports.sendJobMessage = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { message } = req.body;
    
    const job = await JobPost.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    let recipientId;
    if (req.user.role === 'caregiver') {
      recipientId = job.creator;
    } else {
      const application = job.applications.find(app => 
        app.status === 'interview' || app.status === 'accepted'
      );
      recipientId = application?.caregiver;
    }

    const newMessage = new Message({
      sender: req.user.id,
      receiver: recipientId,
      jobPost: jobId,
      text: message,
      status: 'sent'
    });

    await newMessage.save();
    
    res.json({ 
      message: 'Message sent successfully',
      messageId: newMessage._id 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

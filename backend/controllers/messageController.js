const Message = require('../models/Message');

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

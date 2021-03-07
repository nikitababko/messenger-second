const Chatroom = require('../models/Chatroom');

exports.createChatroom = async (req, res) => {
  try {
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({
        errorMessage: 'Chatroom name can contain only alphabets.',
      });
    }

    const chatroomExists = await Chatroom.findOne({ name });

    if (chatroomExists) {
      return res.status(400).json({
        errorMessage: 'Chatroom with the name already exists.',
      });
    }

    const chatroom = new Chatroom({
      name,
    });
    await chatroom.save();

    res.json({
      errorMessage: 'Chat room created!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});

  res.json(chatrooms);
};

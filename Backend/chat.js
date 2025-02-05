const express = require('express');
const router = express.Router();
const GroupMessage = require("./models/GroupMessage");
const DmMessage = require("./models/DmMessage");

router.get('/group/:groupName', async (req, res) => {
  try {
    const { groupName } = req.params;

    const messages = await GroupMessage.find({ room: groupName })
      .sort({ date_sent: 1 });  

    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching group messages:', error);
    return res.status(500).json({ message: 'Failed to fetch group messages' });
  }
});

router.get('/dm/:sender/:receiver', async (req, res) => {
    try {
      const { sender, receiver } = req.params;
  
      const messages = await DmMessage.find({
        $or: [
          { from_user: sender, to_user: receiver },
          { from_user: receiver, to_user: sender },
        ],
      }).sort({ date_sent: 1 });
  
      console.log(messages);
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching DM messages:', error);
      return res.status(500).json({ message: 'Failed to fetch DM messages' });
    }
  });
  

module.exports = router;

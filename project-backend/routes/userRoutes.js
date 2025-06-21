const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.put(
  '/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: {
          public_id: req.file.public_id,
          url: req.file.path
        }
      },
      { new: true }
    );
    res.json(user);
  }
);
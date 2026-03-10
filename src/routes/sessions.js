const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware(['mentor']), async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/lessons/:id/sessions', authMiddleware(), async (req, res) => {
  try {
    const sessions = await Session.find({ lessonId: req.params.id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
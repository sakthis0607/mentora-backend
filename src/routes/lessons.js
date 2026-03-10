const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware(['mentor']), async (req, res) => {
  try {
    const lesson = await Lesson.create({ ...req.body, mentorId: req.user.id });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/', authMiddleware(), async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('mentorId', 'name email');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
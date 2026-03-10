const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware(['parent']), async (req, res) => {
  try {
    const student = await Student.create({ ...req.body, parentId: req.user.id });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.get('/', authMiddleware(['parent']), async (req, res) => {
  try {
    const students = await Student.find({ parentId: req.user.id });
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
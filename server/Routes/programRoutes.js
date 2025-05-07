import express from 'express';
import Program from '../Models/Program.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newProgram = new Program(req.body);
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

export default router;
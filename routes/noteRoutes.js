const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const User = require("../models/User");
const Note = require('../models/Note');

// Middleware to authenticate requests
router.use(authMiddleware);

// Get all notes for the authenticated user
router.get('/', async (req, res) => {
  try {
    const userId = req.User._id;
    const notes = await Note.find({ user_id: userId });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific note by ID for the authenticated user
router.get('/:id', async (req, res) => {
  try {
    const userId = req.User._id;
    const noteId = req.params.id;

    const note = await Note.findOne({ _id: noteId, user_id: userId });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new note for the authenticated user
router.post('/', async (req, res) => {
  try {
    const userId = req.User._id;
    const username = req.User.username;
    const { title, content } = req.body;

    const newNote = new Note({
      user_id: userId,
      username : username,
      title,
      content,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing note by ID for the authenticated user
router.put('/:id', async (req, res) => {
  try {
    const userId = req.User._id;
    const noteId = req.params.id;
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user_id: userId },
      { title, content, updated_at: Date.now() },
      { new: true } // Return the updated document
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a note by ID for the authenticated user
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.User._id;
    const noteId = req.params.id;

    const deletedNote = await Note.findOneAndDelete({ _id: noteId, user_id: userId });

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

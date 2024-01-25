const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route 1: GET all the notes using get request /api/notes/fetchalluser . login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }
})
//Route 2: Add a new note using post request /api/notes/addnote . login required
router.post('/addnote', fetchUser, [
  // validating
  body('title', "Title length must be atleast 3 characters").isLength({ min: 3 }),
  body('description', "Decription lenght must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
  try { //destructuring
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    //If the credentials doesn't match the upper criteria then error will thrown 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({ title, description, tag, user: req.user.id })
    const savedNote = await note.save();
    res.json(savedNote);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }
})

//ROUTE 3 : UPDATE AN EXISTING NOTE USING POST REQUEST /API/NOTE/UPDATENOTE : LOGIN REQUIRED
router.put('/updatenote/:id', fetchUser, [
  // validating
  body('title', "Title length must be atleast 3 characters").isLength({ min: 3 }),
  body('description', "Decription lenght must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
  try { //destructuring
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    //If the credentials doesn't match the upper criteria then error will thrown 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Create a newNote object for updation
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    //ALLOw UPDATION ONLY IF USER OWNS THIS NOTE
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Prohibited");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }
})

//ROUTE 4 : DELETING AN EXISTING NOTE USING DELETE REQUEST /API/NOTE/DELETENOTE : LOGIN REQUIRED
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try { 
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    //ALLOw DELETION ONLY IF USER OWNS THIS NOTE
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Prohibited");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note has been deleted" , note: note})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }

})

module.exports = router;
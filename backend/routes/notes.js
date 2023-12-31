const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/note/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/note/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {

            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
// ROUTE 3: update Note using: put "/api/note/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create newNote
    let newNote = {};
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

    try {
        // Finding the note
        let note = await Note.findOne({ _id: req.params.id });
        if (!note) {
            return res.status(404).send("Couldn't find the note.");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Notes didn't match.");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
// ROUTE 4: Delete Note using: DELETE "/api/note/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try {
        // Finding the note
        let note = await Note.findOne({ _id: req.params.id });
        if (!note) {
            return res.status(404).send("Couldn't find the note.");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "success":"note has been deleted", note: note });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;


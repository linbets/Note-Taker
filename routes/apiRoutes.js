const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8",(err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

router.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    return fs.readFile(path.join(__dirname, "../db/db.json"), "utf8",(err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes),"utf8", () => {
            res.status(200).json({success: newNote});
        });
    });
});

router.delete("/api/notes/:id", (req, res) => {
    const targetId = req.params.id;
    return fs.readFile(path.join(__dirname, "../db/db.json"), "utf8",(err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const filterNote = notes.filter((note) => note.id !== targetId);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filterNote),"utf8", () => {
            res.status(200).json({success: targetId});
        });
    });
});

module.exports = router;
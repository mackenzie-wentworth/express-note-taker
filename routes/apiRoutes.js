// Import module dependencies
const path = require('path');
const fs = require('fs');

// Imports npm package for random UUID
const { v4: uuidv4 } = require('uuid');

// db.json file variable
const dbJsonFile = 'db/db.json';

// Exports module to use for API routes
module.exports = (app) => {
    // 'GET/api/notes' to read the db.json file and return all saved notes to JSON
    app.get('/api/notes', (req, res) => {
        console.log(`${req.method} request received for new saved note`);
        
        res.sendFile(path.join(__dirname, '../db/db.json'));
  });

    // 'POST/api/notes' to recieve a new note to save on the request body, add it to the db.json file, and then return the NEW note to the client
    app.post('/api/notes', (req, res) => {
        console.info(`${req.method} request received to submit new saved note`);

        let db = fs.readFileSync(dbJsonFile);
        db = JSON.parse(db);
        res.json(db);
        let newNote = {
        title: req.body.title,
        text: req.body.text,
        // The property 'note_id' gives each note a UNIQUE ID when it's saved (using UUID package)
        note_id: uuidv4(),
        };

        // Writes the new note to the db.json file
        db.push(newNote);
        fs.writeFileSync(dbJsonFile, JSON.stringify(db));
        res.json(db);
    });

    // DELETE route deletes the note by specific 'note_id' from db.json file
    app.delete('/api/notes/:id', (req, res) => {
        // First, read all notes from db.json file
        let db = JSON.parse(fs.readFileSync(dbJsonFile))
    
        // Next, DELETE request with query parameter containing id of a note to delete
        let deleteNote = db.filter(item => item.note_id !== req.params.note_id);

        // Then, rewrite the notes to db.json file (once deleted note has been removed)
        fs.writeFileSync(dbJsonFile, JSON.stringify(deleteNote));
        res.json(deleteNote);
    })

};

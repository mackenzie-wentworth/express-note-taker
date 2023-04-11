// TODO: Import file packages
const path = require('path');
const fs = require('fs');

// Imports npm package for random UUID
const { v4: uuidv4 } = require('uuid');

// db.json file variable
const dbJsonFile = 'db/db.json';

// Export module to use for API routes
module.exports = (app) => {
    // TODO: Create 'GET/api/notes' to read the db.json file and return all saved notes to JSON
    app.get('/api/notes', (req, res) => {
        console.log(`${req.method} request received for new saved note`);
        res.sendFile(path.join(__dirname, '../db/db.json'));
  });

    // TODO: Create 'POST/api/notes' to recieve a new note to save on the request body, add it to the db.json file, and then return the NEW note to the client
    app.post('/api/notes', (req, res) => {
        console.info(`${req.method} request received to submit new saved note`);
        let db = fs.readFileSync(dbJsonFile);
        db = JSON.parse(db);
        res.json(db);
        let newNote = {
        title: req.body.title,
        text: req.body.text,
        // TIP: Find a way to give each note a UNIQUE ID when it's saved (use UUID package)
        note_id: uuidv4(),
        };
        // This writes the new note to the db.json file
        db.push(newNote);
        fs.writeFileSync(dbJsonFile, JSON.stringify(db));
        res.json(db);
    });

}

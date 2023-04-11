// TODO: Import file packages
const routes = require('express').Router();
const uuid = require('./uuid');
const fs = require('fs');
const util = require('util');

// Import db.json file
const db = require('./db/db.json');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// TODO: Create 'GET/api/notes' to read the db.json file and return all saved notes to JSON
routes.get('api/notes', (req, res) => {
    console.log(`${req.method} GET request received for new saved note`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// TODO: Create 'POST/api/notes' to recieve a new note to save on the request body, add it to the db.json file, and then return the NEW note to the client
// TIP: Find a way to give each note a UNIQUE ID when it's saved (use UUID package)


// Exports 'routes' requests
module.exports = routes; 
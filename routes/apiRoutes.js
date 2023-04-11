// TODO: Import file packages
const routes = require('express').Router();
const uuid = require('./uuid');
const fs = require('fs');
const util = require('util');

// Import db.json file
const db = require('./db/db.json');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Function to write new note data to JSON file 
const writeToFile = (db, content) =>
  fs.writeFile(db, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${db}`)
  );

// Function to read data from ./db/db.json file and append new note
const readAndAppend = (content, db) => {
  fs.readFile(db, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(db, parsedData);
    }
  });
};

// TODO: Create 'GET/api/notes' to read the db.json file and return all saved notes to JSON
routes.get('api/notes', (req, res) => {
    console.log(`${req.method} GET request received for new saved note`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// TODO: Create 'POST/api/notes' to recieve a new note to save on the request body, add it to the db.json file, and then return the NEW note to the client
routes.post('api/notes', (req, res) => {
    console.info(`${req.method} POST request received to submit new saved note`);
    const { title, text } = req.body;
  
    // If all the required properties of a new note are present
    if (title && text) {
      // Variable to define the properties of the new saved note
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        // TIP: Find a way to give each note a UNIQUE ID when it's saved (use UUID package)
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting new saved note');
    }
});

// Exports 'routes' requests
module.exports = routes; 
// TODO: Import file packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded data for 'Public' folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Routing for api and html
const apiRouter = require('./routes/apiRoutes');
const htmlRouter = require('./routes/htmlRoutes');

app.use('/api/apiRoutes', apiRouter);
app.use('/html/htmlRoutes', htmlRouter);

// GET reads from the db.json file and returns all saved notes.
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../db/db.json'))
);

// TODO: Create app listener for PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
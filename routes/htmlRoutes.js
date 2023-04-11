// TODO: Import file packages
const express = require('express');
const path = require('path');

module.exports = (app) => {

   // TODO: Create 'GET/notes' to return the notes.html file
    app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
// TODO: Create 'Get *' to return the index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    })
  };


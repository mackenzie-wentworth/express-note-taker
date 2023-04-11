// Import module dependencies
const path = require('path');

// Exports this module to use for html routes
module.exports = (app) => {

   // 'GET/notes' to return the notes.html file
    app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
// 'Get *' to return the index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    })
  };


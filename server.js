// Import module dependencies
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded data for 'Public' folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routing for api and html
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// App listener for PORT 3001
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
const express = require('express');
const path = require('path');

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 80;

// Statically serve the build files
app.use(express.static(path.join(__dirname, '../build')));

// All routes load react app at ./build/index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});

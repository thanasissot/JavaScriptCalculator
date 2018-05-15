const express = require('express');
const server = express()

server.use(express.static(__dirname + '/app'));


server.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

server.listen(3000, () => console.log("Serving Port 3000"));

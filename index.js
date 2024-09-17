const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

app.get('/', (_req, res) => {
    res.send('Hello from Node API Server');
})
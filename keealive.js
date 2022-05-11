const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Yo! Discord bot is not online 24/7\nMake sure to host it in our Discord server!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
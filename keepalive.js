    const express = require('express');
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => res.send('Yo! Discord bot is now online 24/7\nMake sure to host it in our Discord server!'));

    app.listen(port, () => console.log(`RadioBot application is listening at ${port}`));

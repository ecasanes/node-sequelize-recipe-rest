const express = require('express');
const recipeApp = require('./app');
const recipeRouter = require('./routers/recipe');

recipeApp.init();

const app = express();
const port = process.env.PORT || 3000;

// middleware should be positioned above all declared app.use
// app.use((req, res, next) => {});

app.use(express.json());
app.use(recipeRouter);

app.get('*', (req, res) => {
    res.sendStatus(405);
    res.send({
        code: 405,
        message: 'Method not allowed'
    })
});

app.post('*', (req, res) => {
    res.sendStatus(405);
    res.send({
        code: 405,
        message: 'Method not allowed'
    })
});

app.listen(port, () => {
    console.log('server is up on port: ', port);
});


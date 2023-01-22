const express = require('express')
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const app = express()
const port = 3000

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create();

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}`)
})
const express = require('express');
const bodyParser = require('body-parser');  
const hbs = require('hbs');

var app = express();

// Port
const port = process.env.PORT || 8080;

// I don't know what this is for but whatever!
app.use(express.static(__dirname));

// Web Pages
app.set('views', __dirname);

// Partials
hbs.registerPartials(__dirname + '/partials');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (request, response) => {
    // When they make a request to the server (this file!)
    response.render('index.hbs');
});

app.get('/pictures', (request, response) => {
    // When they make a request to the server (this file!)
    response.render('index.hbs');
});

app.get('/weather', (request, response) => {
    // When they make a request to the server (this file!)
    response.render('index.hbs');
});

// app.post('/', (request, response) => {
//     response.render('index.hbs', {
//         returned_data: request.body["data"]
//     })
// })

app.listen(port, () => {
    console.log('Server is up and running');
});

const express = require('express');
const bodyParser = require('body-parser');  
const hbs = require('hbs');
// const request = require('request');
const axios = require('axios');
// const pixabay = require('pixabay');
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
    response.render('index.hbs', {
        title: "Home Page"
    });
});

app.get('/pictures', (request, response) => {
    // Gallery Get
    response.render('pictures.hbs', {
        title: "Gallery"
    });
});

app.post('/pictures', async(request, response) => {
    // Gallery Post
    console.log(request.body);
    var query = request.body["query"];
    var url = `https://pixabay.com/api/?key=12227711-2b8be503764e201cc3222631d&q=${query}&image_type=photo`;
    var image = await axios.get(url);
    var images = image.data.hits;
    query_image = images[0]["largeImageURL"];
    console.log(query_image);
    response.render('pictures.hbs', {
        title: "Gallery",
        returned_image: query_image
    })
});

app.get('/weather', (request, response) => {
    // When they make a request to the server (this file!)
    response.render('weather.hbs', {
        title: "Forecast"
    });
});

// app.post('/', (request, response) => {
//     response.render('index.hbs', {
//         returned_data: request.body["data"]
//     })
// })

app.listen(port, () => {
    console.log('Server is up and running');
});

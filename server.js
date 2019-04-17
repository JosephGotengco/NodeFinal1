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

app.get('/nasa', (request, response) => {
    // Gallery Get
    response.render('nasa.hbs', {
        title: "Gallery"
    });
});

app.post('/nasa', async(request, response) => {
    // Gallery Post
    console.log(request.body);
    var query = request.body["query"];
    var url = `https://images-api.nasa.gov/search?q=${query}`;
    var json = await axios.get(url);
    var json = json.data.collection.items[4].href
    console.log(json);
    var gallery = await axios.get(json)
    console.log(gallery.data)
    // var gallery = await axios.get(gallery.data)
    // console.log(gallery.data)
    response.render('nasa.hbs', {
        title: "Gallery",
        image1: gallery.data[0],
        image2: gallery.data[1],
        image3: gallery.data[2],
        // image4: gallery.data[3],
        // image5: gallery.data[4],
        // image6: gallery.data[5]
    })
});

app.get('/deck', (request, response) => {
    // When they make a request to the server (this file!)
    response.render('deck.hbs', {
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

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
    var json = json.data.collection.items[0].href
    console.log(json);
    var gallery = await axios.get(json)
    console.log(gallery.data)
    // var gallery = await axios.get(gallery.data)
    // console.log(gallery.data)
    response.render('nasa.hbs', {
        title: "Gallery",
        images: gallery.data

    })
});

app.get('/deck', (request, response) => {
    response.render('deck.hbs', {
        title: "Deck"
    });
});

app.post('/deck', async(request, response) => {
    var num = parseInt(request.body.number);
    console.log(typeof num)
    var url = `https://deckofcardsapi.com/api/deck/new/draw/?count=${num}`
    var deck = await axios.get(url);
    var deck = deck.data["cards"]
    var image_array = []
    for (var i in deck) {
        console.log(deck[i]);
        // console.log(deck[i]["image"])
        image_array.push(deck[i]["image"])
    }
    console.log(image_array)
    response.render('deck.hbs', {
        title: "Deck",
        images: image_array
    })
})

app.listen(port, () => {
    console.log('Server is up and running');
});

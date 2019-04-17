const express = require('express');
const bodyParser = require('body-parser');  

var utils = require('./utils');
var app = express();
const port = process.env.PORT || 8080;
app.set('views', __dirname)
app.use(express.static(__dirname))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {

    // When they first go to the url/webpage
    response.render('index.hbs');


    // When they make a request to the server (this file!)
    request.render('index.hbs')

})

app.listen(port, () => {
    console.log('Server is up and running');
    // utils.init()
});

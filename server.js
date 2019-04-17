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
    response.render('index.hbs')
})


app.post('/saveStudent', function(request, response) {
    var id = request.body.id;
    var name = request.body.name;
    var email = request.body.email;
    // response.send(id + ' ' + name + ' ' + email);

    var db = utils.getDb();
    db.collection('students').insertOne({
        id: id,
        name: name,
        email: email
        }, (err, result) => {
        if (err) {
            response.send('Unable to insert student');
        }
        response.send(JSON.stringify(result.ops, undefined, 2));
    });
});

app.put('/updateStudent/:name', function(request, response) {
    var db = utils.getDb();
    var id = request.body.id;
    var name = request.body.name;
    var email = request.body.email;
    db.collection('students').findOneAndUpdate({name: request.params.name}, {'$set': {'name': name, 'id': id, 'email': email}}, (err, item) => {
        if (item['value'] == null) {
            response.send(`Cannot find the document with the name of ${request.params.name}`);
            console.log(`Updated: Cannot find ${request.params.name}`)
        } else {
            response.send(`Updated the document ${request.params.name} in the collection`);
            console.log(`Updated: ${request.params.name}`);
        }
    });
});

app.delete('/deleteStudent/:name', function(request, response) {
    var db = utils.getDb();
    var name = request.params.name;
    db.collection('students').findOneAndDelete({name: name}, (err, item) => {
        if (item['value'] == null) {
            response.send(`Cannot find document with the name of ${name}`);
            console.log(`Deleted: Cannot find ${name}`);
        } else {
            response.send(`Deleted the document ${name} from the colleciton`);  
            console.log(`Deleted: ${name}`);
        }
    });
});

app.get('/getStudent/:name', function(request, response) {
    var db = utils.getDb();
    var name = request.params.name;
    db.collection('students').find({name: name}).toArray((err, items) => {
        response.send(items);
    });
});

app.get('/all', function(request, response) {
    var db = utils.getDb();
    db.collection('students').find().toArray((err, items) => {
        response.send(items);
    });
    
});

app.listen(port, () => {
    console.log('Server is up and running');
    // utils.init()
});

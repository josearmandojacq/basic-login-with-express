const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/contacts_db';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Contact = require('./contact.model');
////////////// Functions //////////////////////////////
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connection.openUri(url);

function insertUser(request, response, callback) {
    let newContact = new Contact();
    newContact.first_name = request.body.firstname;
    newContact.last_name = request.body.lastname;
    newContact.phone = request.body.phonenumber;
    newContact.email = request.body.email;
    newContact.hobbies = request.body.hobbies;


    newContact.save((err, contact) => {
       if(err){
           response.send('Error!!!!');
       }else{
           callback();
       }
    });

}




app.get('/', (request, response) =>
    response.sendFile('add_contact.html', {root: __dirname})
);

app.post('/contacts', function (request, response) {
    insertUser(request, response, () => {
        response.sendFile('contacts.html', {root: __dirname});
    });

});

app.get('/contacts', function (request, response) {
    response.sendFile('contacts.html', {root: __dirname});
});



app.get('/get_contacts', function(request, response){

    Contact.find({})

        .exec((err, contacts) => {

            if(err){
                response.end('Error!!');
            }else{
                response.json(contacts);
            }
        });

});

app.listen(8080);
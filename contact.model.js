var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactsSchema = new Schema ({
    first_name: String,
    last_name: String,
    phone: Number,
    email: String,
    hobbies: String
});

module.exports = mongoose.model('Contact', ContactsSchema);
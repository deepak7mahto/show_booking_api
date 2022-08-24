const { Schema, default: mongoose } = require("mongoose");

const { Types: { ObjectId } } = Schema
1
const locationsSchema = new Schema({
    "name": String,
    "cast": String,
    "language": String,
    "genre": String,
    "locations": [{ type: ObjectId, ref: 'Location' }]
});

exports.Locations = mongoose.model('Locations', locationsSchema);
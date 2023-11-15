const mongoose = require('mongoose');

const dbName = process.env.NODE_ENV === 'test' ? 'acebook_test' : 'acebook';
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports.dbName = dbName;

var mongooseInhouse = require('mongoose');

mongooseInhouse.Promise = global.Promise;
mongooseInhouse.connect('mongodb://localhost:27017/InhouseApp');

exports.module = {mongooseInhouse}
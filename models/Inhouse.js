var mongooseInhouse = require('mongoose');
var Inhouse = mongooseInhouse.model('Inhouse',{
    folioNum:{
        type: Number,
        required:true
    },
    firstName:{
        type: String,
        required:true,
        trim:true
    },
    lastName:{
        type: String,
        trim:true
    },
    address:{
        type: String,
        trim:true
    },
    checkinDate:{
        type: String
    },
    checkoutDate:{
        type: String
    },
    ratePgm:{ 
        type: String
    },
    status:{
        type: String
    },
    notes:{
        type: String
    }

});
module.exports = {Inhouse}
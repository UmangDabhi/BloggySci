const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    snippet:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
},
{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);
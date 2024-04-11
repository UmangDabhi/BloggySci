const mongoose = require('mongoose');

const connectMongoDb = async ()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log("Database connected successfully");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectMongoDb;
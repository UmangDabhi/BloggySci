const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
    authorName:{
        type:String,
        required:[true,"Please Enter Author Name"],
        unique: true
    },
    authEmail:{
        type:String,
        required:[true,"Please Enter Email"],
        unique: true,
        validate: [isEmail,"Please Enter Valid Email"]
    },
    authPasswd:{
        type:String,
        required:[true,"Please Enter Password"],
        minlength:[6,"Password Length must be atleast 6"]
    }
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(this.isModified("authPasswd")){
        this.authPasswd = await bcrypt.hash(this.authPasswd,10);
    }
    next();
})
module.exports = mongoose.model("User",userSchema);
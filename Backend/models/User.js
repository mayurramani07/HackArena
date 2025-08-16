const mongoose = require("mongoose");
const brcypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    email : { type : String, required : true, unique : true},
    passwordHash : {type : String, required : true},
    createdAt : {type : Date, default : Date.now}

});

UserSchema.methods.comparePassword = async function(password) {
    return await brcypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model("User", UserSchema);

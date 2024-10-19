const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: {
        type:String,
        trim: true,
        unique: [true, 'Entered email already exists'],
        required: [true, 'Email is required'],
    },
    password: {
        trim:true,
        type:String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must 8 characters long']
    }
},{timestamps:true});

const UserModel = mongoose.model('user',userSchema);
module.exports = {
    userModel : UserModel,
}
const bcrypt = require("bcrypt")
const mongoose = require('mongoose')

// DEFINE USER SCHEMA
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    }, 
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        // EAMIL FORMAT VALIDATION
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, {timestamps: true})


// CONFIRM PASSWORD USING VIRTUAL ATTRIBUTE SINCE WE DON'T STORE IT IN DB
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


// WE RUN A VALIDATION FOR CONFIRM PASSWORD FIRST
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// ALL VALIDATIONS ARE SUCCESSFUL, BEFORE SAVING IT TO DB, TURN PASSWORD INTO HASED FORMAT
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model("User", UserSchema)
module.exports = User


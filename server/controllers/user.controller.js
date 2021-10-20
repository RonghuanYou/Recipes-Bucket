const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
// npm bcrypt

module.exports = {
    register: (req, res) => {
        const user = new User(req.body);
        user.save()
        .then(() => {
            console.log(user)
            res.json({ msg: "success!", user: user });
        })
        .catch(err => {
            console.log("ERR: ", err)
            res.status(400).json(err)
        });
    },


    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    console.log("user is null");
                    return res.sendStatus(400);
                }
                else {
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                const newJwt = jwt.sign({
                                    _id: user._id
                                }, process.env.SECRET_KEY)
                                res
                                    .cookie("usertoken", newJwt, { httpOnly: true })
                                    .cookie("user_id", user._id)
                                    .json({ msg: "Success!" });
                            }
                        })
                        .catch(err => res.status(400).json({ msg: "PASSWORD ERROR" }));
                }
            })
            .catch(err => res.json(err));
    },

    getUsers: (req, res) => {
        User.find({})
            .then(users => res.json(users))
            .catch(err => res.json(err))
    },

    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.clearCookie("user_id")
        return res.status(200).json("log out")
    }
}


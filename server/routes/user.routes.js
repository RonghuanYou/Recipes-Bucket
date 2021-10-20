const { register, login, getUsers, logout } = require("../controllers/user.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = app => {
    app.post("/api/register", register)
    app.post("/api/login", login)
    // authenticate FUNC REQUIRE USERS TO BE LOGGED IN
    app.get("/api/users", authenticate, getUsers)
    app.get("/api/logout", logout)
}
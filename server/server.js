const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser')

// middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// require files(route and mongoose)
require('./config/mongoose.config');

require('dotenv').config();

// route file exports an function
require('./routes/user.routes')(app);
require('./routes/recipe.routes')(app);


app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
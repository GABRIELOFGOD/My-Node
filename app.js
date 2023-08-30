const express = require('express');
const dbConnect = require('./config/dbConfig');
const router = require('./routes/blogRoutes');
const adminrouter = require('./routes/adminRoutes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config();
const expressLayout = require('express-ejs-layouts')

const PORT = process.env.PORT || 5500;
dbConnect();

// app.use(express.json())

app.use(express.static('public'));

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', adminrouter)
app.use('/', router)

app.listen(PORT, ()=>{
    console.log(`listening at port ${PORT}`)
})


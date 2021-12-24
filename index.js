const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
app.use(cookieParser())
app.use(express.json())
let distDir = __dirname + "/dist/";
 app.use(express.static(distDir));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

const dbURI = process.env.DATABASE_URI

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    console.log('connected to db')
    app.listen(port, () => {
        console.log('express server started')
    })
    
    const authRouter = require('./routes/authRoutes')
    app.use(authRouter)
    
    const userRouter = require('./routes/userRoutes')
    app.use('/user', userRouter)
    
    app.use((req, res) => {
        res.render('four04')
    })
}).catch((err) => console.log(err))


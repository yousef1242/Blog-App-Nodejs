const express = require('express')
const mongoose  = require('mongoose')
const dotenv  = require('dotenv')
const flash  = require('connect-flash')
const path = require('path')
const homeRoutes = require('./routes/homeRoutes')
const authRoutes = require('./routes/authRoutes')
const accountRoutes = require('./routes/accountRoutes')
const postRoutes = require('./routes/postRoutes')


const app = express()
//.env file
dotenv.config()
app.use(flash()) // for errors


//for login
const session = require('express-session')
const Posts = require('./models/postsModels')
const sessionStore = require('connect-mongodb-session')(session)

const Store = new sessionStore({
    uri: process.env.CONNECT_MONGODB,
    collection: 'sessions'
})

app.use(session({
    secret: 'this is my secret secret to hash express session .....',
    saveUninitialized: false,
    store: Store,
}))


//static files
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
// ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//routes
app.use('/',homeRoutes)
app.use('/',authRoutes)
app.use('/portfolio',accountRoutes)
app.use('/post',postRoutes)


mongoose.connect(process.env.CONNECT_MONGODB).then(() => {
    app.listen(process.env.PORT,() => {
        console.log('server is running');
    })
}).catch(err => console.log(err))

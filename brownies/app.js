const express= require('express')
const mongoose =require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDb = require('./config/db')
const methodOverride = require('method-override')

dotenv.config({path: './config/config.env'})

require('./config/passport')(passport)

const app = express()

connectDb()

app.use(express.urlencoded({ extended: false}))


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)


const { formatDate , stripTags, truncat, editIcon, select} = require('./helpers/hbs')


app.engine('.hbs',exphbs({helpers:{formatDate, stripTags, truncat, editIcon, select}, defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')


const PORT = process.env.PORT || 5000
app.listen(PORT,console.log("server connected to ",PORT))

app.use(express.static(path.join(__dirname,'public')))


app.use('/',require('./routes/home'))
app.use('/auth',require('./routes/auth'))
app.use('/recipe',require('./routes/recipes'))

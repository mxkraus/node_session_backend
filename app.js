const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


const app = express();
const sessionStore = new MySQLStore({
    host: 'db26.variomedia.de',
    user: 'u45659',
    password: 'nasenbaer',
    database: 'db45659',
    schema: {
        tableName: 'no_sessions'
    }
});

app.set('view engine', 'ejs');
app.set('views', 'views');


const authRoutes = require('./routes/auth');

const adminRoutes = require('./routes/admin');
const backendRoutes = require('./routes/user_backend');

const frontendRoutes = require('./routes/frontend');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret', // should be a long string value
    resave: false, // session is only saved when smt. changed
    saveUninitialized: false,
    store: sessionStore, // Sessions in DB speichern    
}));

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(backendRoutes);
app.use(frontendRoutes);

app.listen(3000); 
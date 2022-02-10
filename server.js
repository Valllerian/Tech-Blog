// requiring dependencies;
const path = require('path')
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// importing helpers;
const helpers = require('./utils/helpers');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// setting up cookies and log in timer;
const sess = {
  secret: 'super secret secret',
  cookie: {maxAge: 86400,},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// connecting handlebars;
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// listening to the 3001 port;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

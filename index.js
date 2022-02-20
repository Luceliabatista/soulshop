require('dotenv/config');
require('./database');

const express = require('express');
const exphand = require('express-handlebars');
const app = express();

//Quando backend trabalhar diretamente com o front, em modelo de API, se faz desnecessário
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphand.engine());
app.set('view engine', 'handlebars');

const router = require('./routes');
app.use(router);

app.listen(3000);


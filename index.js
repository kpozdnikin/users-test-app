var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var app = express();

db.on('error', console.error);

//Подключаем роуты, конфиг и вспомогательные функции
var configs = require('./config');
var routes = require('./routes/routes');
var helperFunctions = require('./helpers/helperFunctions');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Подключаемся к Монго
mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);
//Заполняем базу данных, если она пустая
helperFunctions.populateDb();

//Инициализируем роуты
routes(app);
//Транслируем клиента
app.use('/',express.static('client'));
app.use('/home',express.static('client'));
app.use('/users',express.static('client'));

//Запускаем сервер
app.listen(configs.applicationPort, function () {
  console.log('Example app listening on port ' + configs.applicationPort + '!');
});

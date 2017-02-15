var Users = require('../models/users');

var helpers = {};

//Болванка функции проверки авторизации
helpers.isAuthenticated = function(req, res, next){
	next();
};

//Если база данных пользователей пуста, заполняем ее
helpers.populateDb = function(){
	var promise = Users.get();
	promise.then(function(data){
		if(data.length){
			console.log('Users table already populated.');
		}
		else{
			console.log('Populating users table.');
			Users.seed();	
		}
	});
};

module.exports = helpers;

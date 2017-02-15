var mongoose = require('mongoose');
var q = require('q');
var https = require('https');
var request = require('request');

//Определяем структуру сущности пользователя
var userSchema = new mongoose.Schema({
	  firstName: String,
	  lastName: String,
	  category: String
});

var User = mongoose.model('Users', userSchema);

//Инициализация модели пользовател
var userModel = {};

//Заполняем нашу базу, для этого берем пользователй у гитхаба и дополняем их собственной информацией
userModel.seed = function(){
	var usersFromGithub = [];
	var makeUsersArray = function(next){
		if(!next){
			next = {
				githubUsers: [],
				link: 'https://api.github.com/users'
			}
		}
		getGithubUsers(next.link).then(function(data) {
			if (data && data.githubUsers) {
				usersFromGithub = usersFromGithub.concat(data.githubUsers);
				console.log('users length = ' + usersFromGithub.length);
				if (usersFromGithub.length < 300) {
					//долбим гитхаб с промежутками, чтобы не стать плохим ботом ))
					setTimeout(function () {
						makeUsersArray(data);
					}, 500);
				}
				else{
					convertUsers(usersFromGithub);
				}
			}
		});
	};
	makeUsersArray();
};

//Возвращаем всех пользователей, используем параметры для постепенной загрузки или пагинации
userModel.get = function(skip, limit, order){
	var results = q.defer(),
		skip = parseInt(skip) || 0,
		limit = parseInt(limit) || 300;

	User.find(function(err, users) {
	  if (err){
	  	results.reject(err);
	  } 
	  results.resolve(users);
	}).skip(skip).limit(limit);

	return results.promise;
};
//Возвращаем список категорий с пользователями
userModel.getUsersByCategory = function(){
	var results = q.defer(),
		skip = parseInt(skip) || 0,
		limit = parseInt(limit) || 300;

	User.find(function(err, users) {
		if (err){
			results.reject(err);
		}
		results.resolve(users);
	}).skip(skip).limit(limit);

	return results.promise;
};

//Добавляем нового пользователя в базу
userModel.addUser = function(user){
	var results = q.defer();
	var users = [];

	users.push(user);

	User.collection.insert(users, function(err, dbUser) {
		if(err){
			console.log('error occured in populating database');
			console.log(err);
		}
		else{
			results.resolve(dbUser);
		}
	});
	return results.promise;
};

function getGithubUsers(link){
	var results = q.defer();
	console.log(link);
	var data = {
		githubUsers: [],
		link: ''
	};
	var options = {
		url: link,
		headers: {
			'User-Agent': 'request'
		}
	};
	//вытаскиваем пользователей и ссылку на следующую партию
	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			data.githubUsers = JSON.parse(body);
			data.link = response.headers.link.split(';')[0].replace('<', '').replace('>', '');
			results.resolve(data);
		}
		else {
			console.log(error);
			results.reject(error);
		}
	}
	request(options, callback);
	return results.promise;
}

function convertUsers(users){
	var dbUser = {};
	if(!users.length){
		return false;
	}
	users.forEach(function(user){
		var defaultUser = new User({
			firstName: user.login,
			lastName: user.id + user.login,
			category: user.id % 4
		});
		defaultUser.save(function(err, user) {
			if(err) console.dir('error occured in populating database');
		});
	})
}

module.exports = userModel;
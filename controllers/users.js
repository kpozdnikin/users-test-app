var userModel = require('../models/users');

var users = {};

// Контроллер для получения списка пользователей
users.getUsers = function (req, res) {

	var skip = req.query.skip;
	var limit = req.query.limit;
	var orderBy = req.query.order;
	var usersData = userModel.get(skip, limit, orderBy);

	usersData.then(function(data){
		var response = {};
		response.status = 'success';
		response.data = data;
		res.send(response);
	}, function(err){
		res.send(err);
	});

};

// Контроллер для получения списка пользователей
users.addUser = function (req, res) {

	var user = {
		firstName: req.body.firstName || null,
		lastName: req.body.lastName || null,
		category: req.body.category || null
	};
	console.log(user);
	var usersData = userModel.addUser(user);
	console.log(usersData);

	usersData.then(function(data){
		var response = {};
		response.status = 'success';
		response.data = data;
		res.send(response);
	}, function(err){
		res.send(err);
	});

};

module.exports = users;
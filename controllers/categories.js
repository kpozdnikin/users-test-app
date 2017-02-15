var usersModel = require('../models/categories');

var categories = {};

// controller that handles video listings fetch request.
categories.getCategoriesAndUsers = function (req, res) {
	
	var skip = req.query.skip;
	var limit = req.query.limit;

	var categoriesData = usersModel.get(skip, limit);
	categoriesData.then(function(data){
		var response = {};
		response.status = 'success';
		response.data = data;
		res.send(response);
	}, function(err){
		res.send(err);
	});

};

module.exports = categories;
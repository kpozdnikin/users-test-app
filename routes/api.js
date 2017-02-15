var users = require('../controllers/users');
var categories = require('../controllers/categories');
var helpers = require('../helpers/helperFunctions');

var routesAPI = function(app){

	//user routes
	app.get('/api/users', helpers.isAuthenticated, users.getUsers);
	app.post('/api/users', helpers.isAuthenticated, users.addUser);

	//users categories routes
	app.get('/api/categories/users', helpers.isAuthenticated, categories.getCategoriesAndUsers);
};


module.exports = routesAPI;
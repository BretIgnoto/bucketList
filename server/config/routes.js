var User = require('../controllers/users.js');
var List = require('../controllers/lists.js');
module.exports = function(app) {
	app.post('/login', function(req,res) {
		User.login(req,res);
	})
	app.get('/users', function(req,res) {
		User.index(req,res);
	})
	app.get('/user/:id', function(req,res) {
		User.show(req,res);
	})
	app.post('/list', function(req,res) {
		List.create(req,res);
	})
	app.get('/list/:id', function(req,res) {
		List.index(req,res);
	})
	app.patch('/list/:id', function(req,res) {
		List.check(req,res);
	})
	app.post('/list/:id', function(req,res) {
		List.comment(req,res);
	})
	app.patch('/comment/:id', function(req,res) {
		List.like(req,res);
	})
}
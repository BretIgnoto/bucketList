var User = require('../controllers/users.js');
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
	app.post('/list/:id', function(req,res) {
		User.create(req,res);
	})
	app.get('/list/:id', function(req,res) {
		User.list(req,res);
	})
	app.put('/list/:id', function(req,res) {
		User.check(req,res);
	})
}
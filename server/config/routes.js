var User = require('../controllers/users.js');
var Topics = require('../controllers/topics.js')
module.exports = function(app) {
	app.post('/login', function(req,res) {
		User.login(req,res);
	})
	app.get('/topics', function(req,res) {
		Topics.index(req,res);
	})
	app.post('/topics', function(req,res) {
		Topics.create(req,res);
	})
	app.get('/topics/:id', function(req,res) {
		Topics.show(req,res);
	})
	app.post('/answer/:tid/:aid', function(req,res) {
		Topics.comment(req,res);
	})
	app.post('/answer/:id', function(req,res) {
		Topics.answer(req,res);
	})
	app.put('/topics/:id', function(req,res) {
		Topics.like(req,res);
	})
	app.put('/topic/:id', function(req,res) {
		Topics.dislike(req,res);
	})
	app.get('/user/:id', function(req,res) {
		User.show(req,res);
	})
	app.post('/user/topic', function(req,res) {
		User.topic(req,res);
	})
	app.post('/user/answer', function(req,res) {
		User.answer(req,res);
	})
	app.post('/user/comment', function(req,res) {
		User.comment(req,res);
	})
}
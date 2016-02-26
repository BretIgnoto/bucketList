var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports= (function() {
	return {
		login: function(req, res) {
			User.findOne({name: req.body.name}, function(err, results) {
				if(err) console.log(err);
				else if(results) res.json(results);
				else {
					User.create(req.body, function(err,results) {
						if(err) console.log(err);
						else res.json(results);
					})
				}
			})
		},
		index: function(req,res) {
			User.find({}, function(err, users) {
				if(err) conole.log(err);
				else res.json(users);
			})
		},
		create: function(req,res) {
			console.log(req.body);
			User.findOne({_id: req.params.id}, function(err, user) {
				if(err) console.log(err);
				else {
					user.list.push(req.body);
					user.save(function(err) {
						if(err) console.log(err);
						else res.json(true);
					})
				}
			})
		},
		list: function(req,res) {
			User.findOne({_id: req.params.id}).populate('list').exec(function(err, result) {
				if(err) console.log(err);
				else res.json(result);
			})
		},
		show: function(req,res) {
			User.findOne({_id: req.params.id}).populate('list').exec(function(err, result) {
				if(err) console.log(err);
				else res.json(result);
			})
		},
		check: function(req,res) {
			User.findOne({_id: req.params.id}, function(err,user) {
				if(err) console.log(err);
				var list = user.list.id(req.body._id);
				list.checked++;
				user.save(function(err) {
					if(err) console.log(err);
					res.json(true);
				})
			})
		}
	}
})();
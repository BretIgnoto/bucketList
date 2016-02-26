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
		}
	}
})();
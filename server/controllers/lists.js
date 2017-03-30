var mongoose = require('mongoose');
var List = mongoose.model('List');
module.exports= (function() {
	return {
		create: function(req, res){
	     	List.create(req.body, function(err, results){
		        if(err) console.log(err);
		        else res.json(results);
	      	})
    	},
    	index: function(req,res) {
    		List.find({$or: [{author: req.params.id}, {tagged_user: req.params.id}]})
    			.populate("author tagged_user comments.user").exec(function(err, results){
    				if(err) console.log(err);
    				else res.json(results);
    			})
    	},
    	check: function(req,res) {
    		List.findOne({_id: req.params.id}, function(err, item) {
    			if(err) console.log(err);
    			if(item.checked !== true) {
    				item.checked = true;
    			}
    			else {
    				item.checked = false;
    			}
    			item.save(function(err) {
    				if(err) console.log(err);
    				res.json(item);
    			})
    		})
    	},
    	comment: function(req,res) {
    		List.findOne({_id: req.params.id}, function(err, item) {
    			if(err) console.log(err);
    			else {
    				item.comments.push(req.body);
    				item.save(function(err) {
    					if(err) console.log(err);
    					res.json(true);
    				})
    			}
    		})
    	},
        like: function(req,res) {
            List.findOne({_id: req.params.id}, function(err, item) {
                if(err) console.log(err);
                else {
                    var comment = item.comments.id(req.body._id);
                    comment.likes++;
                    item.save(function(err) {
                        if(err) console.log(err);
                        res.json(true);
                    })
                }
            })
        },
        destroy: function(req,res) {
            List.update(
                {_id: req.params.lid},
                {$pull: { "comments" : { _id: req.params.cid } }},
                function(err) {
                    if(err) console.log(err);
                    else res.json(true);
                }
            );
        },
        delete: function(req,res) {
            List.remove({_id: req.params.id}, function(err, results) {
                if(err) console.log(err);
                else res.json(results);
            })
        }
	}
})();
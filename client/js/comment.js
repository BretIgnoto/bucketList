belt.factory("CommentFactory", function($http) {
    var factory = {};
    factory.create = function(comment, item, callback) {
    	console.log(comment);
        $http.post('/list/' + item._id, comment).then(callback);
    }
    factory.like = function(comment, item, callback) {
        $http.patch('/comment/' + item, comment).then(callback);
    }
    return factory;
});
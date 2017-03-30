belt.factory("CommentFactory", function($http) {
    var factory = {};
    factory.create = function(comment, item, callback) {
        $http.post('/list/' + item._id, comment).then(callback);
    }
    factory.like = function(comment, item, callback) {
        $http.patch('/comment/' + item, comment).then(callback);
    }
    factory.destroy = function(comment, item, callback) {
    	$http.get('/remove/' + item + '/' + comment).success(function(output) {
          callback();
        })
    }
    factory.delete = function(item, callback) {
    	$http.get('/remove/comment/' + item).success(function(output) {
          callback();
        })
    }
    return factory;
});
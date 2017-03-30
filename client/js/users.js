belt.factory("UserFactory", function($http) {
    var factory = {};
    var currentUser = null;
    factory.getCurrentUser = function() {
        return currentUser;
    }     
    factory.login = function(user, callback) {
        $http.post('/login', user).success(function(output) {
        currentUser = output;
        callback(currentUser);                       
        })
    };
    factory.index = function(callback) {
        $http.get('/users').then(function(response) {
            callback(response.data);
        })
    }
    factory.show = function(id, callback) {
        $http.get('user/' + id).then(callback);
    }
    factory.delete = function(user, callback) {
        $http.get('/remove/' + user).success(function(output) {
          callback();
        })
    }
    return factory;
});
belt.controller('UsersController', function($scope, UserFactory, $location) {
    $scope.currentUser = UserFactory.getCurrentUser();
    if($scope.currentUser){
        $location.path('/home');
    } 
    $scope.login = function(user) {
        UserFactory.login(user, function(data) {
            $scope.currentUser = data;              
            $location.path('/home');    
        });
    };
});

belt.controller('UserController', function($scope, UserFactory, $location, $routeParams) {
    $scope.currentUser = UserFactory.getCurrentUser();
    if(!$scope.currentUser){
        $location.path('/');
    }
    function showUser() {
        UserFactory.show($routeParams.id, function(result) {
        $scope.user = result.data;
        })
    } 
    showUser();
});

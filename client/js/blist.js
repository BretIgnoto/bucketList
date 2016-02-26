belt.factory("BListFactory", function($http) {
    var factory = {};
    factory.create = function(list, callback) {
        console.log(list);
        if(list.tag) {
            console.log(list.tag);
            $http.post('/list/' + list.tag, list);
        }
        $http.post('/list/' +  list.currentUser._id, list).then(callback);
    }
    factory.index = function(currentUser, callback) {
        $http.get('/list/' + currentUser._id).then(function(response) {
            callback(response.data);
        })
    }
    return factory;
});
belt.controller('BListController', function($scope, UserFactory, BListFactory, $location) {
    $scope.currentUser = UserFactory.getCurrentUser();
    if(!$scope.currentUser){
        $location.path('/');
    }
    function getUsers() {
        UserFactory.index(function(data) {
            $scope.users = data;
        })
    }
    function getList() {
        BListFactory.index($scope.currentUser, function(data) {
            $scope.bList = data;
        })
    }
    getList();
    getUsers();
    $scope.newList = function(list) {
        list.user = $scope.currentUser.name;
        list.currentUser = $scope.currentUser;
        BListFactory.create(list, function() {
            $scope.new_list = {};
        })
        getUsers();
        getList();
    }
    $scope.check = function(lid) {
        UserFactory.check($scope.currentUser._id, lid, getList)
    }
});
belt.controller('UserListController', function($scope, UserFactory, BListFactory, $location, $routeParams) {
    $scope.currentUser = UserFactory.getCurrentUser();
    if(!$scope.currentUser){
        $location.path('/');
    }
    function show() {
        UserFactory.show($routeParams.id, function(result) {
            $scope.userList = result.data;
        })
    }
    show();
    $scope.check = function(uid, lid) {
        UserFactory.check(uid, lid, show)
    }
})
belt.factory("BListFactory", function($http) {
    var factory = {};
    factory.create = function(list, callback) {
        console.log(list);
        $http.post('/list', list).then(callback);
    }
    factory.index = function(user_id, callback) {
        $http.get('/list/' + user_id).then(function(response) {
            callback(response.data);
        })
    }
    factory.check = function(item_id, callback) {
        $http.patch('/list/' + item_id).then(callback)
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
        BListFactory.index($scope.currentUser._id, function(data) {
            $scope.bList = data;
        })
    }
    getList();
    getUsers();
    $scope.newList = function(list) {
        list.author = $scope.currentUser;
        BListFactory.create(list, function() {
            $scope.new_list = {};
        })
        getUsers();
        getList();
    }
    $scope.check = function(item) {
        BListFactory.check(item._id, getList);
    }
});
belt.controller('UserListController', function($scope, UserFactory, CommentFactory, BListFactory, $location, $routeParams) {
    $scope.currentUser = UserFactory.getCurrentUser();
    if(!$scope.currentUser){
        $location.path('/');
    }
    function show() {
        BListFactory.index($routeParams.id, function(result) {
            $scope.userList = result;
        })
    }
    function showUser(){
        UserFactory.show($routeParams.id, function(res) {
            $scope.user = res.data;
        })
    }
    showUser();
    show();
    $scope.check = function(item) {
        BListFactory.check(item._id, show);
    }
    $scope.newComment = function(comment, item) {
        comment.user = $scope.currentUser;
        CommentFactory.create(comment, item, show)
    }
    $scope.like = function(item, comment) {
        CommentFactory.like(comment, item._id, show)
    }
})
angular.module('nodeTodo', [])
.controller('mainController', function($scope, $http) {
    $scope.formData = {};
    $scope.todoData = {};

    $http.get('/todos')
	.success(function(data) {
			$scope.todoData = data;
			console.log(data);
    })
	.error(function(error) {
      console.log('error');
    });

	$scope.deleteTodo = function(todoID){
		$http.delete('/todos/' + todoID)
		.success(function(data){
			$scope.todoData = data;
			console.log(data);
			$http.get('/todos')
			.success(function(data) {
					$scope.todoData = data;
					console.log(data);
			})
			.error(function(error) {
			  console.log('error');
			});
		})
		.error(function(data) {
			console.log("error");
		});

	};

	$scope.createTodo = function(todoID) {
		$http.post('/todos', $scope.formData)
		.success(function(data){
			$scope.formData = {};
			$scope.todoData = data;
			console.log(data);
		})
		.error(function(error){
			console.log('error');
		});
	};
 });


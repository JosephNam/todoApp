angular.module('nodeTodo', []).controller('mainController', ($scope, $http) ->
  $scope.formData = {}
  $scope.todoData = {}

  $http.get('/todos').success( (data)->
    $scope.todoData = data
    console.log data
    return
  ).error (error)->
    console.log error
    return

  $scope.deleteTodo = (todoID)->
    $http.delete('/todos/' + todoID).success( (data)->
      $scope.todoData=data
      console.log data
      $http.get('/todos').success((data)->
        $scope.todoData = data
        console.log data
        return
      ).error (error)->
        console.log 'error'
        return
      return
    ).error( (data)->
      console.log 'error'
      return
    )
    return
  $scope.createTodo = (todoID) ->
    $http.post('/todos', $scope.formData).success( (data)->
      $scope.formData = {}
      $scope.todoData = data
      console.log data
      return
    ).error (error)->
      console.log("error")
      return
    return
  return
)

'use strict';


var app = angular.module('app',[]);


app.controller('MainController', ['$scope','$http',function($scope,$http){
  $scope.flag = false;
  $scope.searching = false;
  $scope.index = 0;
  $scope.data = 'd';

  $scope.$watch('index', function(){
    $scope.link = $scope.data.responseData.results[$scope.index].url;
  });

  $scope.search = function(){
    $scope.searching = true;
    $http({
      url: 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q='+ $scope.querry,
      method: 'GET',
    }).success(function(data){
      $scope.searching = false;
      $scope.index = 0;
      $scope.flag = false;
      $scope.errors = "";
      if(data.responseData.results.length == 0){
        $scope.errors = "no pic found";
      }else{
        $scope.flag = true;
        $scope.data = data;
        $scope.link = data.responseData.results[0].url;
      }
      $scope.querry = '';
    }).error(function(err){
      $scope.data = err;
    })
  };

  $scope.next = function(){
    if($scope.index < $scope.data.responseData.results.length-1) $scope.index++;
  };

  $scope.previous = function(){
    if($scope.index > 0) $scope.index--;
  };

}]);
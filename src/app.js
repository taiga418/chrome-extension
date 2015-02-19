'use strict';


var app = angular.module('app',[]);


app.controller('MainController', ['$scope','$http',function($scope,$http){
  $scope.flag = false;
  $scope.data = 'd';
  $scope.search = function(){
    $http({
      url: 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q='+ $scope.querry,
      method: 'GET',
    }).success(function(data){
      $scope.flag = false;
      $scope.errors = "";
      if(data.responseData.results.length == 0){
        $scope.errors = "no pic found";
      }else{
        $scope.flag = true;
        $scope.link = data.responseData.results[0].url;
      }
      $scope.querry = '';
    }).error(function(err){
      $scope.data = err;
    })
    
    //$scope.data = $scope.querry;
  }
}]);
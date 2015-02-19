'use strict';


var app = angular.module('app',[]);


app.controller('MainController', ['$scope' ,function($scope){
  $scope.data = 'd';
  $scope.search = function(){
    console.log('asdf');
    $scope.data = $scope.querry;
  }
}]);
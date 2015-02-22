'use strict';


var app = angular.module('app',[]);


app.controller('MainController', ['$scope','$http',function($scope,$http){
  $scope.flag = false;
  $scope.searching = false;
  $scope.index = 0;


  $scope.$watch('index', function(){
    if($scope.data) $scope.link = $scope.data.responseData.results[$scope.index].url;
  });

  $scope.search = function(){
    $scope.link = '';
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

  //goes to next image if available
  $scope.next = function(){
    if($scope.index < $scope.data.responseData.results.length-1) $scope.index++;
  };

  //goes back to previous image if available.
  $scope.previous = function(){
    if($scope.index > 0) $scope.index--;
  };

  //can't use ng-clipboard directive, so using the messier alternative
  $scope.copy = function(){
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = $scope.link;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
  }

}]);
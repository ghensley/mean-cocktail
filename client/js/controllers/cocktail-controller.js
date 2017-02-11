var app = angular.module("cocktail",[]);

app.controller("cocktailController", ["$scope", "$http", function($scope, $http){
	$scope.ingredients = [];
	$scope.getIngredients = function(){
		$http({
  			method: 'GET',
  			url: '/api/ingredients'
		}).then(function successCallback(response) {
	    	$scope.ingredients = response.data;
	  	}, function errorCallback(response) {
	    	console.log(response);
	  	});
	}
	$scope.getIngredients();
}]);
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
	$scope.update = function(ingredient){
		$http({
  			method: 'GET',
  			url: '/api/update_availability/'+ingredient._id+'/'+ingredient.have
		}).then(function successCallback(response) {
	    	console.log(response)
	  	}, function errorCallback(response) {
	    	console.log(response);
	  	});
	}
}]);

app.controller("recipeController", ["$scope", "$http", function($scope, $http){
	$scope.name = "";
	$scope.prep = "";
	$scope.description = "";
	$scope.ingredients = []
	$scope.createCocktail = function(){
		var parameter = JSON.stringify({
  				name: $scope.name,
  				prep: $scope.prep,
  				description: $scope.description,
  				ingredients: $scope.ingredients
  		});

		$http.post('/api/create_cocktail', parameter).
    	success(function(data, status, headers, config) {
        	console.log(data);
      	}).
      	error(function(data, status, headers, config) {
	    	console.log(response);
      	});


	}
}]);
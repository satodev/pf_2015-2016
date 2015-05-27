var app = angular.module("sPortfolio2015",["ngRoute","ngAnimate"]);
app.controller("mainController",function($scope, $route, $routeParams, $location){
	console.log($scope + " " + $route + " " + $routeParams + " " + $location);
});
app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/portfolio/',{
		templateUrl:"partials/portfolio.php",
		controller:"mainController"
	});
	$routeProvider.when('/presentation',{
		templateUrl:"partials/presentation.php",
		controller:"mainController"
	});
	$routeProvider.when('/contact',{
		templateUrl:"partials/contact.php",
		controller:"mainController"
	});
	$routeProvider.when("/pf_2015-2016",{
		templateUrl:"index.php",
		controller:"mainController"
	});
	$routeProvider.otherwise({redirectTo:"/"});
	$locationProvider.html5Mode(true);
});
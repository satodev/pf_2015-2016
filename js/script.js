var app = angular.module("sPortfolio2015",["ngRoute","ngAnimate"]);
app.controller("mainController",function($scope, $route, $routeParams, $location,navBarToggle){
	navBarToggle();
});
app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/portfolio',{
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
	$routeProvider.otherwise({redirectTo:"/presentation"});
	$locationProvider.html5Mode(true);
});
app.factory("navBarToggle",function(){
	var mainTitle = document.getElementById("mainTitle");
	var d = document.getElementById("navBarActiveController");
	var data = null;
	var i=0;
	mainTitle.onclick=function(){
		data = this;
		toggleClass(d.children[0]);
	}
	d.children[0].onclick=function(){
		data = this;
		toggleClass(this);
	}
	d.children[1].onclick=function(){
		data=this;
		toggleClass(this);
	}
	d.children[2].onclick=function(){
		data = this;
		toggleClass(this);
	}
	function toggleClass(attr){
		for(var i = 0; i<d.children.length; i++){
			d.children[i].className = "none";
		}
		attr.className = "active";
	}
	return function(){
		console.log("navBarToggle Active");
	}
});
app.animation(".animBorderColor",["$animateCss",function($animateCss){
	return{
		enter:function(element,doneFn){
			var height = element[0].offsetHeight;
			return $animateCss(element, {
				from: { height:'0px' },
				to: { height:height + 'px' },
				duration: 1 
			});
		}
	}
}]);
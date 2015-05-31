var app = angular.module("sPortfolio2015",["ngRoute","ngAnimate"]);
app.controller("mainController",function($scope, $route, $routeParams, $location,navBarToggle,scopeFactory){
	navBarToggle();
	
	$scope.animNavbar = function(el){
		var elem = el;
		scopeFactory(elem);
	}
	$scope.autoCollapseMenu = function(){
		var n = document.getElementsByClassName("nav");
		for(var i=0; i<n.length;i++){
			n[i].onclick = function(){
				$('.collapse').collapse("hide");
			}
		}

	}
	$scope.autoCollapseMenu();
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
app.factory("scopeFactory",function(){
	return function(elem){
		var cont = document.getElementById("mainNavBar");
		if(elem!=null){
			var e = elem;
			switch(e){
				case "presentation":
				cont.classList.add("anim-presentation");
				cont.classList.remove("anim-portfolio");
				cont.classList.remove("anim-contact");
				break;
				case "portfolio":
				cont.classList.add("anim-portfolio");
				cont.classList.remove("anim-presentation");
				cont.classList.remove("anim-contact");
				break;
				case"contact":
				cont.classList.add("anim-contact");
				cont.classList.remove("anim-portfolio");
				cont.classList.remove("anim-presentation");
				break;
				default:
				cont.classList.add("anim-default");
				break;
			}
		}
		console.log(elem);
	}
});
var app = angular.module("sPortfolio2015",["ngRoute","ngAnimate"]);
app.controller("mainController",function($scope, $route, $routeParams, $location,navBarToggle){
	navBarToggle();

	$scope.autoCollapseMenu = function(){
		var n = document.getElementsByClassName("nav");
		var nb = document.getElementsByClassName("navbar-brand");
		for(var i=0; i<n.length;i++){
			n[i].onclick = function(){
				$('.collapse').collapse("hide");
			}
		}
		for(var j=0;j<nb.length;j++){
			nb[j].onclick = function(){
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
app.factory("navBarToggle",function(scopeFactory){
	var mainTitle = document.getElementById("logo");
	var data = null;
	var i=0;
	
	function linkClicked(){
		var qa = document.querySelectorAll("a");
		var logo = document.getElementById("logo");
		for(var i=0; i<qa.length;i++){
			qa[i].onclick=function(){
				console.log(this);
				var linkAttr = this.getAttribute("href");
				console.log(linkAttr);
				detectNavBarElem(linkAttr);
			}	
		}
		logo.onclick=function(){
			console.log(this.parentNode);
			var logoAttr = logo.parentNode.getAttribute("href");
			detectNavBarElem(logoAttr);
		}
	}
	function detectNavBarElem(elem){
		if(elem == "/pf_2015-2016/portfolio"){
			console.log("portfolio detected in link");
			scopeFactory("portfolio");
			getNavBarActiveElem("portfolio");
		}
		if(elem == "/pf_2015-2016/presentation"){
			console.log("presentation detected in link");
			scopeFactory("presentation");	
			getNavBarActiveElem("presentation");
		}
		if(elem == "/pf_2015-2016/contact"){
			console.log("contact detected in link");
			scopeFactory("contact");
			getNavBarActiveElem("contact");
		}
	}
	function getNavBarActiveElem(searchElem){
		var se = searchElem;
		var d = document.getElementById("navBarActiveController");
		var obj = {};
		for(var i=0; i<d.childElementCount;i++){
			console.log(d.chilNodes);
			var elem = d.children[i];
			obj[i] = elem;
		}
		if(se == "portfolio"){
			toggleClass(obj[1]);
		}
		if(se == "presentation"){
			toggleClass(obj[0]);
		}
		if(se == "contact"){
			toggleClass(obj[2]);
		}
	}
	function toggleClass(attr){
		var d = document.getElementById("navBarActiveController");
		for(var i = 0; i<d.children.length; i++){
			d.children[i].className = "none";
		}
		console.log(attr);
		attr.className = "active";
	}
	return function(){
		linkClicked();
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
	}
});
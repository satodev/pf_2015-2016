var app = angular.module("sPortfolio2015",["ngRoute","ngAnimate"]);
app.controller("mainController",function($scope, $route, $routeParams, $location,navBarToggle){
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
	navBarToggle();
	$scope.autoCollapseMenu();
});
app.controller("portfolioController",function($scope, portfolioManager){
	$scope.filters = portfolioManager();
	$scope.buttonClicked=function(arg){
		console.log("filters are " + $scope.filters);
		console.log("you clicked " + arg);
	}
});
app.controller("contactController",function($scope){
	console.log("contact controller here");
});
app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/portfolio',{
		templateUrl:"partials/portfolio.php",
		controller:"portfolioController"
	});
	$routeProvider.when('/presentation',{
		templateUrl:"partials/presentation.php",
		controller:"mainController"
	});
	$routeProvider.when('/contact',{
		templateUrl:"partials/contact.php",
		controller:"contactController"
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
				var linkAttr = this.getAttribute("href");
				detectNavBarElem(linkAttr);
			}	
		}
		logo.onclick=function(){
			var logoAttr = logo.parentNode.getAttribute("href");
			detectNavBarElem(logoAttr);
		}
	}
	function detectNavBarElem(elem){
		if(elem == "/pf_2015-2016/portfolio"){
			scopeFactory("portfolio");
			getNavBarActiveElem("portfolio");
		}
		if(elem == "/pf_2015-2016/presentation"){
			scopeFactory("presentation");	
			getNavBarActiveElem("presentation");
		}
		if(elem == "/pf_2015-2016/contact"){
			scopeFactory("contact");
			getNavBarActiveElem("contact");
		}
	}
	function getNavBarActiveElem(searchElem){
		var se = searchElem;
		var d = document.getElementById("navBarActiveController");
		var obj = {};
		for(var i=0; i<d.childElementCount;i++){
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
app.factory("portfolioManager",function(){
	var filters = [];
	function resetFilters(){
		filters = [];
	}
	function updatePostSubject(){
		var c = document.querySelectorAll(".mainPortfolio h3");
		var elem = null;
		var finalArray = [];
		var splitArray = [];
		for(var i = 0; i<c.length;i++){
			if(c[i].getAttribute("title") != null && c[i].getAttribute("title") != undefined && c[i].getAttribute("title") != ""){
				elem = getTitleData(c[i]);
				splitSpaces(splitArray, elem);
				//checkArray(elem);
			}
		}	
		return filters;
	}
	function getTitleData(contArray){
		elem = contArray.getAttribute("title").toUpperCase();
		return elem;
	}
	function splitSpaces(array, e){
		var regex = /\s/gi;
		var res = e.split(regex);
		if(res){
			for(var i =0; i<res.length;i++){
				filters.push(res[i]);
			}
		}
		return true;
	}
	function verifDoubles(){
		var clearArray = [];
		console.log(filters);
		for(var i=0; i<filters.length; i++){
			var compt = 0;
			for(var j=0; j<filters.length; j++){
				if(filters[i] == filters[j] && i != j){
					compt++;
					console.log("filters I " + i +" "+filters[i] + " filters J "+ j +" "+filters[j] + " " + compt);
					clearArray = filters[i];
					console.log(clearArray);
					
				}
			}
		}
		return filters = clearArray;
	}
	return function(){
		resetFilters();
		updatePostSubject();
		verifDoubles();
		//verifFilters();
		console.log(filters);
		return filters;
	}
});
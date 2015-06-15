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
	$scope.filters = portfolioManager().filters;
	//$scope.indexes = portfolioManager().indexes;
	$scope.buttonClicked = function(arg){
		if(arg == 'reset'){
			$scope.reset();
		}else{
			console.log("filters are " + $scope.filters);
			//console.log("indexes are " + $scope.indexes);
			console.log("you clicked " + arg);
			$scope.showArticle(arg);
		}
	}
	$scope.reset = function(){
		var article = document.querySelectorAll(".mainPortfolio h3");
		for(var i =0; i<article.length; i++){
			var elem = article[i].getAttribute("title");
			var allElem = article[i].parentNode.parentNode.parentNode;
			allElem.style.display = "block";
		}
	}
	$scope.showArticle = function(a){
		var e = new RegExp(a, "gi");
		var article = document.querySelectorAll(".mainPortfolio h3");
		for(var i =0; i<article.length; i++){
			var elem = article[i].getAttribute("title");
			var allElem = article[i].parentNode.parentNode.parentNode;
			allElem.style.display = "none";
			console.log(article[i]);
			if(elem != null && elem != " " && elem != ""){
				elem = elem.toUpperCase();
				var reg = elem.match(e);
				if(reg){
					var selectionDisplay = article[i].parentNode.parentNode.parentNode;
					console.log("result of regexp is : "+ reg);
					selectionDisplay.style.display = "block";
					// console.log(article[i].parentNode.parentNode);
				}
			}
			console.log(elem);
		}
		console.log("let show " + a);
		console.log("indexes : " + $scope.indexes);
	}
});
app.controller("contactController",function($scope){
	console.log("contact controller here");
	 $scope.result = 'hidden'

    $scope.resultMessage;

    $scope.formData; //formData is an object holding the name, email, subject, and message

    $scope.submitButtonDisabled = false;

    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted

    $scope.submit = function(contactform) {

        $scope.submitted = true;

        $scope.submitButtonDisabled = true;

        if (contactform.$valid) {

            $http({

                method  : 'POST',

                url     : '../php/contact-form.php',

                data    : $.param($scope.formData),  //param method from jQuery

                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)

            }).success(function(data){

                console.log(data);

                if (data.success) { //success comes from the return json object

                    $scope.submitButtonDisabled = true;

                    $scope.resultMessage = data.message;

                    $scope.result='bg-success';

                } else {

                    $scope.submitButtonDisabled = false;

                    $scope.resultMessage = data.message;

                    $scope.result='bg-danger';

                }

            });

        } else {

            $scope.submitButtonDisabled = false;

            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';

            $scope.result='bg-danger';

        }

    }

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
	var clearArray = [];
	var indexes = [];

	function resetFilters(){
		filters = [];
	}
	function getArrayIndex(){
		return indexes;
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
	function removeArrayValue(val, array){
		for(var i =0; i<val.length; i++){
			var remove = array.splice(val[i],1);
		}
		return array;
	}
	function verifDoubles(){
		console.log(filters);
		for(var i=0; i<filters.length; i++){
			var compt = 0;
			clearArray = filters;
			console.log(clearArray);
			for(var j=0; j<filters.length; j++){
				if(filters[i] == filters[j]){
					compt++;
					console.log("filters I " + i +" "+filters[i] + " filters J "+ j +" "+filters[j] + " " + compt);
				}
				if(compt>=2){
					indexes.push(j);
				}
			}
		}
		removeArrayValue(indexes, clearArray);
		return filters = clearArray;
	}
	return function(){
		resetFilters()
		updatePostSubject();
		verifDoubles();
		getArrayIndex();
		console.log(filters);
		return{
			filters : filters,
			indexes : indexes
		}
	}
});
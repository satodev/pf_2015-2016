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
app.controller("contactController",function($scope,$http){
	  // creating a blank object to hold our form information.
  //$scope will allow this to pass between controller and view
  $scope.formData = {};
  // submission message doesn't show when page loads
  $scope.submission = false;
  // Updated code thanks to Yotam
  var param = function(data) {
  	var returnString = '';
  	for (d in data){
  		if (data.hasOwnProperty(d))
  			returnString += d + '=' + data[d] + '&';
  	}
        // Remove last ampersand and return
        return returnString.slice( 0, returnString.length - 1 );
    };
    $scope.submitForm = function() {
    	$http({
    		method : 'POST',
    		url : 'php/process.php',
    data : param($scope.formData), // pass in data as strings
    headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
})
    	.success(function(data) {
    		if (!data.success) {
       // if not successful, bind errors to error variables
       $scope.errorName = data.errors.name;
       $scope.errorEmail = data.errors.email;
       $scope.errorTextarea = data.errors.message;
       $scope.submissionMessage = data.messageError;
       $scope.submission = true; //shows the error message
   } else {
      // if successful, bind success message to message
      $scope.submissionMessage = data.messageSuccess;
       $scope.formData = {}; // form fields are emptied with this line
       $scope.submission = true; //shows the success message
   }
});
    };
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
		for(var i=0; i<filters.length; i++){
			var compt = 0;
			clearArray = filters;
			console.log(clearArray);
			console.log("initial Value : "+ filters[i] + " " + i);
			for(var j=0; j<filters.length; j++){
				if(filters[i] == filters[j] && i!=j){
					console.log("E - filters I " + i +" "+filters[i] + " filters J "+ j +" "+filters[j] + " " + compt);
					// if(compt>=2){
					//	console.log("D - filters I " + i +" "+filters[i] + " filters J "+ j +" "+filters[j] + " " + compt);
						indexes.push(j);
					// }
				}else{
					console.log("Register data : " + filters[i])
				}
			}
			console.log(indexes);
		}
		console.log(indexes);
		//removeArrayValue(indexes, clearArray);
		console.log(clearArray);
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
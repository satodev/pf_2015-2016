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
		//	console.log(article[i]);
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
		//	console.log(elem);
		}
		console.log("let show " + a);
		console.log("indexes : " + $scope.indexes);
	}
	canvas = {
		draw:function(){
			canvas.dateTimeCanvas();
		},
		updateLength : function(elem){
			console.log(elem);
			console.log(elem.clientHeight);
			console.log(elem.clientWidth);
		},
		dateTimeCanvas: function(){
			var c = document.getElementById("canvasDateTime");
			canvas.updateLength(c);
			var canvasHeight = c.clientHeight;
			var canvasWidth = c.clientWidth;
			console.log("canvasHeight is : " + canvasHeight);
			console.log("canvasWidth is : " + canvasWidth);
			var cn = c.getContext("2d");
			cn.height = canvasHeight;
			cn.width = canvasWidth;

			cn.save();
			cn.beginPath();
			cn.fillStyle = "grey";
			cn.rect(0,0,cn.width, cn.height);
			cn.fill();
			cn.closePath();
			cn.restore();

			cn.save();
			cn.translate((cn.width)/2, (cn.height)/2);
			cn.beginPath();
			cn.arc(0, 0, 5,0, Math.PI*2);
			cn.stroke();
			cn.closePath();
			cn.restore();

			cn.save();
			cn.beginPath();
			cn.font = "12px sans-serif";
			cn.fillStyle ="white";
			cn.fillText(cn.width, 10,20);
			cn.fillText(cn.height, 10,30);
			cn.fillText((cn.width)/2, 10,50);
			cn.fillText((cn.height)/2, 10,60);
			cn.closePath();
			cn.restore();

			cn.save();
			cn.beginPath();
			cn.fillStyle="black";
			cn.moveTo(0,0);
			cn.translate((cn.width)/2, (cn.height)/2);
			cn.arc(0, 0, 0, 0, Math.PI*2);
			cn.fill();
			cn.closePath();
			cn.restore();
		}
	}
	canvas.draw();
	window.onresize = function(){
		canvas.draw();
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
		for(var i=0; i<filters.length; i++){
			var compt = 0;
			clearArray = filters;
			clearArray.sort();
			if(clearArray[i] == clearArray[i+1]){
				var ar = clearArray.indexOf(clearArray[i]);
				var remove = clearArray.splice(ar,1);
				verifDoubles();
			}
		}		
		return filters = clearArray;
	}
	return function(){
		resetFilters()
		updatePostSubject();
		verifDoubles();
		return{
			filters : filters
		}
	}
});
app.factory("portfolioCanvasGenerator",function(){
	console.log("portfolioCanvasGenerator");
	return true;
	// var thumbCont = document.querySelectorAll(".mainPortfolio .thumbnail");
	// console.log(thumbCont);
	// var tHeight = 0;
	// var tWidth = 0;
	// init();
	// function init(){
	// 	defineRange();	
	// 	window.onresize = function(){
	// 		dateTimeCanvas();
	// 	}
	// 	dateTimeCanvas();
	// }
	
	// function defineRange(){
	// 	for(var i = 0; i<thumbCont.length; i++){
	// 		tHeight = thumbCont[i].clientHeight + thumbCont[i].clientTop;
	// 		tWidth = thumbCont[i].offsetWidth;
	// 		console.log("heigth : " + tHeight);
	// 		console.log("width : " + tWidth);
	// 	}return{
	// 		tHeight,
	// 		tWidth
	// 	}
	// }
	
	// function dateTimeCanvas(){
	// 	defineRange();
	// 	var c = document.getElementById("canvasDateTime");
	// 	var cn = c.getContext("2d");
	// 	var grd;
	// 	cn.height = c.height = tHeight + 40;
	// 	cn.width = c.width =  tWidth;
	// 	cn.fillStyle = "purple";
	// 	cn.rect(0,0,cn.width, cn.height)
	// 	cn.fill();
	// 	cn.stroke();
	// 	console.log(c.width);
	// 	//requestAnimationFrame(dateTimeCanvas);
	// }
	// return {
	// 	init : init(),
	// 	dateTimeCanvas: dateTimeCanvas()
	// }
});
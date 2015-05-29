<!DOCTYPE html>
<html lang="en" ng-app="sPortfolio2015">
<head>
	<meta charset="UTF-8">
	<title>Satoru HEMMI - Portfolio</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="img/favicon.ico" />
	<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
	<base href="/pf_2015-2016/">
</head>
<body ng-controller="mainController">
	<div id="mainWrapper">
		<nav ng-class="myCssVar" class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<div class="container-fluid">
				<a class="navbar-brand" href="/pf_2015-2016/presentation" id="mainTitle"><img id="logo" src="img/logo.png" alt="Brand"></a>
				</div>
			</div>
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right" id="navBarActiveController">
					<li ng-click="myCssVar='css-class'" class="active"><a href="/pf_2015-2016/presentation">Presentation</a></li>
					<li><a href="/pf_2015-2016/portfolio">Portfolio </a></li>
					<li><a href="/pf_2015-2016/contact">Contact</a></li>
				</ul>
			</div>
		</nav>
		<div id="view" ng-view>
			
		</div>
	</div>
	<script src="node_modules/angular/angular.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-route.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-resource.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-animate.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="js/script.js"></script>
</body>
</html>
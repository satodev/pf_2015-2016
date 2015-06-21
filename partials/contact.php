<div class="mainContact container-fluid">
	<div class="page-header">
		<h1>Contact</h1>
	</div>
	<div class="links">
		<a href="https://plus.google.com/+SatoHdev/about">Google+</a>
		<a href="https://www.linkedin.com/pub/satoru-hemmi/70/655/289">LinkedIn</a>
		<a href="https://github.com/satodev">Github</a>
		<a href="http://stackexchange.com/users/5087502/dev-sato?tab=top">StackOverflow</a>
	</div>
	<form class="form-horizontal" ng-submit="submitForm()" ng-controller="contactController" novalidate>
		<div class="form-group">
			<label  for="name" class="col-sm-2 control-label">Name</label>
			<div class="col-sm-10 col-md-10 col-lg-8">
				<input type="text" class="form-control" id="inputName3" placeholder="Name"  name="name" ng-model="formData.name" ng-class="{'error' : errorName}">
			</div>
		</div>
		<div class="form-group">
			<label for="email" class="col-sm-2 control-label">Email</label>
			<div class="col-sm-10 col-md-10 col-lg-8">
				<input type="email" class="form-control" id="inputEmail3" placeholder="Email" name="email" ng-model="formData.email" ng-class="{'error' : errorEmail}">
			</div>
		</div>
		
		<div class="form-group">
		<label for="message" class="col-sm-2 control-label">Message</label>
		<div class="col-sm-10 col-md-10 col-lg-8">
			<textarea class="form-control"  name="message" ng-class="{'error' : errorTextarea}" ng-model="formData.message" cols="30" rows="10"></textarea>
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
				<button type="submit" class="btn btn-default" value="Send!" name="submit">Sign in</button>
				<div ng-class="{'submissionMessage' : submission}" ng-bind="submissionMessage"></div>
			</div>
		</div>
	</form>
	<!-- <form ng-submit="submitForm()" ng-controller="FormController" novalidate>
		<div class="form-group">
			<label class="col-sm-2 control-label" for="name">Name</label>
			<div class="col-sm-10 col-md-5 col-lg-8">
				<input type="text" name="name" ng-model="formData.name" ng-class="{'error' : errorName}">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label" for="email">E-mail</label>
			<div class="col-sm-10 col-md-5 col-lg-8">
				<input type="email" name="email" ng-model="formData.email" ng-class="{'error' : errorEmail}">
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label" for="message">Message</label>
			<div class="col-sm-10 col-md-5 col-lg-8">
				<textarea name="message" ng-class="{'error' : errorTextarea}" ng-model="formData.message" cols="30" rows="10"></textarea>
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
				<input type="submit" value="Send!" name="submit">
				<div ng-class="{'submissionMessage' : submission}" ng-bind="submissionMessage"></div>
			</div>
		</div>
	</form> -->
</div>
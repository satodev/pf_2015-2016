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
	<form class="form-horizontal">
		<!-- <div class="form-group">
			<label for="inputEmail3" class="col-sm-2 control-label">Name</label>
			<div class="col-sm-10 col-md-5 col-lg-8">
				<input type="text" class="form-control" id="inputName3" placeholder="Name">
			</div>
		</div>
		<div class="form-group">
			<label for="inputEmail3" class="col-sm-2 control-label">Email</label>
			<div class="col-sm-10 col-md-5 col-lg-8">
				<input type="email" class="form-control" id="inputEmail3" placeholder="Email">
			</div>
		</div>
		
		<div class="form-group">
		<label for="inputEmail3" class="col-sm-2 control-label">Message</label>
		<div class="col-sm-10 col-md-5 col-lg-8">
			<textarea class="form-control" rows="10"></textarea>
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
				<button type="submit" class="btn btn-default">Sign in</button>
			</div>
		</div>
	</form> -->
	<form ng-submit="submit(contactform)" name="contactform" method="post" action="" class="form-horizontal" role="form">
		<div class="form-group" ng-class="{ 'has-error': contactform.inputName.$invalid && submitted }">
			<label for="inputName" class="col-lg-2 control-label">Name</label>
			<div class="col-lg-10">
				<input ng-model="formData.inputName" type="text" class="form-control" id="inputName" name="inputName" placeholder="Your Name" required>
			</div>
		</div>
		<div class="form-group" ng-class="{ 'has-error': contactform.inputEmail.$invalid && submitted }">
			<label for="inputEmail" class="col-lg-2 control-label">Email</label>
			<div class="col-lg-10">
				<input ng-model="formData.inputEmail" type="email" class="form-control" id="inputEmail" name="inputEmail" placeholder="Your Email" required>
			</div>
		</div>
		<div class="form-group" ng-class="{ 'has-error': contactform.inputSubject.$invalid && submitted }">
			<label for="inputSubject" class="col-lg-2 control-label">Subject</label>
			<div class="col-lg-10">
				<input ng-model="formData.inputSubject" type="text" class="form-control" id="inputSubject" name="inputSubject" placeholder="Subject Message" required>
			</div>
		</div>
		<div class="form-group" ng-class="{ 'has-error': contactform.inputMessage.$invalid && submitted }">
			<label for="inputMessage" class="col-lg-2 control-label">Message</label>
			<div class="col-lg-10">
				<textarea ng-model="formData.inputMessage" class="form-control" rows="4" id="inputMessage" name="inputMessage" placeholder="Your message..." required></textarea>
			</div>
		</div>
		<div class="form-group">
		<div class="col-lg-offset-2 col-lg-10">
			<button type="submit" class="btn btn-default" ng-disabled="submitButtonDisabled">
				Send Message
					</button>
				</div>
			</div>
	</form>
	<p ng-class="result" style="padding: 15px; margin: 0;">{{ resultMessage }}</p>

</div>
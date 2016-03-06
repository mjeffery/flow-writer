var CLIENT_ID = "273179587283-57gulv8nr6u9d5kabndcbidnmqhndjm1.apps.googleusercontent.com";
var SCOPES = [
	'https://www.googleapis.com/auth/drive.file', 
	'https://www.googleapis.com/auth/drive.install'
];

function checkAuth() {
	gapi.auth.authorize({
		client_id: CLIENT_ID,
		scope: SCOPES,
		immediate: true
	}, handleAuthResult);
}

function handleAuthResult(authResult) {
	var $prompt = $('#authorize-prompt');
	if(authResult && !authResult.error) {
		$prompt.hide();
		loadDriveApi();
	}
	else {
		$prompt.show();
	}
}

function loadDriveApi() {
	gapi.client.load('drive', 'v2', function() {
		alert('Google API loaded!');
	})
}

$(function() {
	$('.authorize-btn').click(function(e) {
		gapi.auth.authorize({
			client_id: CLIENT_ID,
			scope: SCOPES,
			immediate: false
		}, handleAuthResult);
	});	
});

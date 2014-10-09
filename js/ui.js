var current_page = location.pathname
var key = localStorage.getItem("api_key");
var serviceaddress = 'http://oabutton.cottagelabs.com';
var apiaddress = serviceaddress + '/api';

function login_register_api_call(api_request, data) {
	var response = ''
	var api_key = '';
	var username = '';
    $.ajax({
        'type': 'POST',
        'url': apiaddress + api_request,
        'contentType': 'application/json; charset=utf-8',
        'dataType': 'JSON',
        'processData': false,
        'cache': false,
        'data': data,
        'success': function(data){
    		localStorage.setItem("api_key", data.api_key);
    		window.location.href = "login.html"
    	},
        'error': function(data){
        	// Todo: Handle error here.
        	console.log(data)
    	},
    });
}

function status_request(url) {
	$.ajax({
        'type': 'POST',
        'url': apiaddress + '/status',
        'contentType': 'application/json; charset=utf-8',
        'dataType': 'JSON',
        'processData': false,
        'cache': false,
        'data': JSON.stringify({
            'api_key': key,
            'url': url
        }),
        'success': function(data){
    		// Todo: Handle success. EG. Display info.
    		console.log(data)
    	},
        'error': function(data){
    		// Todo: Handle error here.
    	},
    });
}

if (current_page == '/ui/login.html') {
	window.addEventListener('load', function () {

		// If we have a key, redirect to the main page.
		if (key){
			window.location.href = '/ui/main.html';
		}

		// Handle the register button.
	    document.getElementById("signup").addEventListener('click', function(){
	    	var api_request = '/register';
	    	data = JSON.stringify({
	            'email': document.getElementById("user_email").value,
	            'password': document.getElementById('user_password').value,
	        });
	    	login_register_api_call(api_request, data);
	    });

	    // Handle the login button.
	    document.getElementById("login").addEventListener('click', function(){
	    	var api_request = '/retrieve';
	    	data = JSON.stringify({
	            'email': document.getElementById("user_email").value,
	            'password': document.getElementById('user_password').value,
	        });
	    	login_register_api_call(api_request, data);
	    });

	});

} else if (current_page == '/ui/main.html' && key) {
	window.addEventListener('load', function () {
		// Handle the logout button.
		document.getElementById("logout").addEventListener('click', function(){
    		if ('api_key' in localStorage) localStorage.removeItem('api_key');
    		window.location.href = 'login.html';
    	});
		status_request(document.URL);
	});

} else {
	window.location.href = "login.html";	
}
$(function() {
	$("#username_error_message").hide();
	$("#password_error_message").hide();
	$("#role_error_message").hide();
	$("#email_error_message").hide();

	var error_username = false;
	var error_password = false;
	var error_role = false;
	var error_email = false;

	$("#form_username").focusout(function() {
		check_username();
	});

	$("#form_password").focusout(function() {
		check_password();
	});

	$("#form_role").focusout(function() {
		check_role();
	});

	$("#form_email").focusout(function() {
		check_email();
	});

	function check_username() {
		var username_length = $("#form_username").val().length;
		if(username_length < 5 || username_length > 20) {
			$("#username_error_message").html("Should be between 5-20 characters");
			$("#username_error_message").show();
			error_username = true;
		} else {
			$("#username_error_message").hide();
		}
	}

	function check_password() {
		var password_length = $("#form_password").val().length;
		if(password_length < 5) {
			$("#password_error_message").html("At least 8 characters");
			$("#password_error_message").show();
			error_password = true;
		} else {
			$("#password_error_message").hide();
		}
	}

	function check_role() {
		var role = $("#form_role").val();
		if(role == "employee" || role == "manager") {
      error_role = false;
			$("#role_error_message").hide();
		} else {
      $("#role_error_message").html("Role can either manager or employee only");
			$("#role_error_message").show();
			error_role = true;
		}
	}

	function check_email() {
		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
		if(pattern.test($("#form_email").val())) {
			$("#email_error_message").hide();
		} else {
			$("#email_error_message").html("Invalid email address");
			$("#email_error_message").show();
			error_email = true;
		}
	}

	$("#addUserForm").submit(function() {
		error_username = false;
		error_password = false;
		error_role = false;
		error_email = false;

		check_username();
		check_password();
		check_role();
		check_email();

		if(error_username == false && error_password == false && error_role == false && error_email == false) {
			return true;
		} else {
			return false;
		}
	});
});

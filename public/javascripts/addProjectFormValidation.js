$(function() {
  $("#beginning_error_message").hide();
  $("#due_error_message").hide();
  $("#dev_error_message").hide();
  $("#title_error_message").hide();
  $("#description_error_message").hide();

  var error_title = false;
  var error_description = false;
  var error_beginning = false;
  var error_due = false;
  var error_developer = false;

  $("#form_title").focusout(function() {
		check_title();
	});
  $("#form_description").focusout(function() {
		check_description();
	});
  $("#form_beginning").focusout(function() {
		check_beginning();
	});
	$("#form_due").focusout(function() {
		check_due();
	});
	$("#form_dev").focusout(function() {
		check_developer();
	});

  function check_title() {
    var title_length = $("#form_title").val().length;
    if(title_length < 1) {
      $("#title_error_message").html("Do not leave Title field empty\n");
      $("#title_error_message").show();
      error_title = true;
    } else {
      $("#title_error_message").hide();
    }
  }

  function check_description() {
    var description_length = $("#form_description").val().length;
    if(description_length < 1) {
      $("#description_error_message").html("Do not leave Description field empty\n");
      $("#description_error_message").show();
      error_description = true;
    } else {
      $("#description_error_message").hide();
    }
  }
  function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    //var dNow = new Date();
    if(!d.getTime()) return false; // Invalid date (or this could be epoch)
    return d.toISOString().slice(0,10) === dateString;
  }

  function check_beginning() {
    var valid = false;
    if(isValidDate($("#form_beginning").val())) {
      var v = new Date($("#form_beginning").val());
      var d = new Date();
      if(d.getFullYear() <= v.getFullYear()){
        if((d.getMonth()+1) <= (v.getMonth()+1)){
          if(d.getDate() <= v.getDate()){
            valid = true;
          }
          else valid = false;
        }
        else valid = false;
      }
      else valid = false;
      if(valid){
        $("#beginning_error_message").hide();
      }
      else{
        $("#beginning_error_message").html("Beginning date should be greater than todays date\n");
  			$("#beginning_error_message").show();
        error_beginning = true;
      }
		} else {
			$("#beginning_error_message").html("Invalid beginning date\n");
			$("#beginning_error_message").show();
			error_beginning = true;
		}
  }

  function check_due() {
    var valid = false;
    if(isValidDate($("#form_due").val())) {
      var v = new Date($("#form_due").val());
      var d = new Date($("#form_beginning").val());
      if(d.getFullYear() <= v.getFullYear()){
        if((d.getMonth()+1) <= (v.getMonth()+1)){
          if(d.getDate() <= v.getDate()){
            valid = true;
          }
          else valid = false;
        }
        else valid = false;
      }
      else valid = false;
      if(valid){
        $("#due_error_message").hide();
      }
      else{
        $("#due_error_message").html("Due date should be greater than beginning date\n");
  			$("#due_error_message").show();
        error_due = true;
      }
    } else {
      $("#due_error_message").html("Invalid due date\n");
      $("#due_error_message").show();
      error_due = true;
    }
  }

  function check_developer() {
    var dev_length = $("#form_dev").val().length;
    if(dev_length < 1) {
      $("#dev_error_message").html("Do not leave Developer field empty\n");
      $("#dev_error_message").show();
      error_developer = true;
    } else {
      $("#dev_error_message").hide();
    }
  }

  $("#addProjectForm").submit(function() {
		error_title = false;
		error_description = false;
		error_beginning = false;
		error_due = false;
    error_developer = false;

		check_title();
		check_description();
		check_beginning();
		check_due();
    check_developer();

		if(error_title == false && error_description == false && error_beginning == false && error_due == false && error_developer == false) {
			return true;
		} else {
			return false;
		}
	});
});

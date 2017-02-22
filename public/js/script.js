function fieldValidate() {
	var password = document.getElementById('password').value;
	var username = document.getElementById('username').value
	var email = document.getElementById('email').value;

	var checkCount = 0;

	var errorMessage = "The following field/s are required, should not be empty, or should be corrected: \n\n";

	if(username === "") {
		errorMessage += "Username - should not be empty\n"
	}
	else if(username.length < 8) {
		errorMessage += "Username - Should contain 8 characters or more!\n"
	}
	else {
		checkCount++;
	}

	if (username != "") {
		if(checkUserName() === false) {
			errorMessage += "Username - should not contain any numbers or special characters!\n";
		}
		else {
			checkCount++;	
		}	
	}
	else {
		checkCount++;
	}

	if(email === "") {
		errorMessage += "Email - should not be empty!\n"
	}
	else {
		checkCount++
	}

	if(password === "") {
		errorMessage += "Password - should not be empty!\n";
	}
	else {
		checkCount++;
	}

	if(checkCount === 4) {
		return true;
		checkCount = 0;
	}
	else {
		alert(errorMessage);
		return false;
		checkCount = 0;
		errorMessage = "The following field/s are required, should not be empty, or should be corrected: \n\n";
	}
}

function checkUserName() {
    var username = document.getElementById("username").value;
    var pattern = new RegExp(/[~.`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0123456789]/); //unacceptable chars
    if (pattern.test(username)) {
        return false;
    }
    return true; //good user input
}
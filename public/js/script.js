function fieldValidate() {
	var raised_amount = document.getElementsByName('raised_amount').value
	var funding_date = document.getElementsByName('funding_date').value;
	var errorMessage = "Invalid input(s):\n\n";
	var rightInput;

	 //Check Raised Amount
	if(!/^[0-9.,]+$/.test(raised_amount))
	 {
	 	errorMessage += "Raised Amount value not valid!\n"
	 }
	else
	 {
	 	rightInput++;
	 }

	//Check Funding Date
	if(!/^[0-9.,/]+$/.test(funding_date))
	 {
	 	errorMessage += "Funding Date not valid!\n"
	 }
	else
	 {
	 	rightInput++;
	 }

	if(rightInput === 2)
	 {
		return true;
		rightInput = 0;
	 }
	else
	 {
		alert(errorMessage)? "" : location.reload();;
		return false;
		rightInput = 0;
		errorMessage = "Invalid Input: \n\n";
	 }

	
}
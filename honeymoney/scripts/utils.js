function from_edm_date_to_normal(input_date){
	
	var dt = input_date;
	dt = dt.replace("/Date(", "");
	dt = dt.replace(")/", "");
	var dateValue = new Date(parseInt(dt, 10));
	dateValue.setDate(dateValue.getDate());
	
	var day = (dateValue.getDate() + 1);
	var month = (dateValue.getMonth() + 1);
	
	if (dateValue.getDate() < 10)
		day = '0' + (dateValue.getDate() + 1); 
	
	if (dateValue.getMonth() < 10)
		month = '0' + (dateValue.getMonth() + 1);	
	
	return  day + '.' + month + '.' + dateValue.getFullYear();
}

function format_amount(amount){
	
	var result_amount = [];
	
	amount = Math.round(amount * 100) /100;
	
	if (amount < 0){
		result_amount.color = "red";
		result_amount.amount = "-&euro;" + Math.abs(amount);
	} else {
		result_amount.color = "green";
		result_amount.amount = "&euro;" + Math.abs(amount);
	}
	
	return result_amount; 
}

function format_description(description, max_length){	
    
    if (description.length > max_length)
    	return description.substring(0,max_length) + '...';
    
    return description;
}
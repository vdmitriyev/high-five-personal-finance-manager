window.onload = function() {
	
	// type 1 is for transactions;
	// type 2 is for chart; 
	
	var user_id = "1";
	
	var urlListOfTransactions = "../services/transactionData.xsodata/transactionData?$filter=USER_ID%20eq%20" + user_id + "&$orderby=TRAN_DATE&$format=json";
	loadJSONData(urlListOfTransactions, 1);
	
	var urlDataForChart =  "../charts/transactionUserData.xsjs";
	loadJSONData(urlDataForChart, 2);
}
	
function loadJSONData(url, type) {

		var xmlhttp;

		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {				
				json = xmlhttp.responseText;
				data = JSON.parse(json);
				if (type == 1){
					renderDataToHTMLTable(data);
				} else {
					renderDataToChart(data);
				}
			}
		}

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}


function renderDataToHTMLTable(data){
	
	var outputHTML = "";
	
	outputHTML = "<table class='table table-striped' id='realTransactionsTable'>"	
	outputHTML = outputHTML + "<thead><th>Amount</th><th>Date</th><th>Category</th><th>Description</th></thead>";	
	var amountTextColor = 'red';
	
	for(var i=0;i<data["d"]["results"].length;i++){
	        var obj = data["d"]["results"][i];	        
	        outputHTML = outputHTML + "<tr>";
	        
	        var res_amount = format_amount(obj["AMOUNT"]);
        	
        	outputHTML = outputHTML + "<td style='color:" + res_amount.color + ";'>" + res_amount.amount + "</td>";
	    	outputHTML = outputHTML + "<td>" + from_edm_date_to_normal(obj["TRAN_DATE"]) + "</td>";		    	
	        outputHTML = outputHTML + "<td>" + obj["CATEGORY_TEXT"] + "</td>";		         
	        outputHTML = outputHTML + "<td>" + format_description(obj["DESCRIPTION"], 20) + "</td>";
		        
	        outputHTML = outputHTML + "</tr>";	           
	    }	 
	
	outputHTML = outputHTML + "</table>";
	
	document.getElementById("realTransactionsContainer").innerHTML = outputHTML;
	
	 makeBannerInvisible();
} 

function renderDataToChart(data){
	
	var chart = new CanvasJS.Chart("chartContainer", data);
	chart.render();
}

function makeBannerInvisible(){
	
	document.getElementById("dummyTransactionsTable").style.display = 'none';	
	document.getElementById("waitBanner").style.display = 'none';
}
	


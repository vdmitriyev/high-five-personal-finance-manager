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
	        
	        	if (obj["AMOUNT"] < 0){
	        		outputHTML = outputHTML + "<td style='color:red;'>-&euro;" + Math.abs(obj["AMOUNT"]) + "</td>";
	        	} else {
	        		amountTextColor = 'green';
	        		outputHTML = outputHTML + "<td style='color:green;'>&euro;" + obj["AMOUNT"] + "</td>";
	        	}
	        	
		        
		        outputHTML = outputHTML + "<td>" + obj["TRAN_DATE"] + "</td>";
		        outputHTML = outputHTML + "<td>" + obj["CATEGORY_TEXT"] + "</td>";
		        outputHTML = outputHTML + "<td>" + obj["DESCRIPTION"] + "</td>";
		        
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
	


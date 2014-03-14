window.onload = function() {
	
	// type 1 is for transactions
	// type 2 is for chart 1
	// type 3 is for chart 2
	
	var user_id = "1";
	var top_amount = "10";
	var urlListOfTransactions = "../services/transactionData.xsodata/transactionData?$filter=USER_ID%20eq%20" + user_id + "&$orderby=TRAN_DATE%20desc&$top=" + top_amount + "&$format=json";	
	loadJSONData(urlListOfTransactions, 1);
	
	var urlDataForChart =  "../charts/transactionsUserCategories.xsjs";
	loadJSONData(urlDataForChart, 2);
	
	var urlDataForChartPrediction =  "../charts/transactionDataPrediction.xsjs";
	loadJSONData(urlDataForChartPrediction, 3);
	
	renderPredictedDataToHTMLTable();
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
				if (type == 1)
					renderDataToHTMLTable(data);
				if (type == 2)
					renderDataToChart(data);
				if (type == 3)
					renderDataToChartPrediction(data);				
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
		        descr = obj["DESCRIPTION"];
		        
		        if (descr.length > 20){
		        	
		        	descr = descr.substring(0,20) + '...';
		        }
		        
		        outputHTML = outputHTML + "<td>" + descr + "</td>";
	        outputHTML = outputHTML + "</tr>";	           
	    }	 
	
	outputHTML = outputHTML + "</table>";
	
	document.getElementById("realTransactionsContainer").innerHTML = outputHTML;
	
	 makeBannerInvisible();
} 

function renderPredictedDataToHTMLTable(){
	
	data = JSON.parse("{\"d\":{\"results\":[{\"__metadata\": {\"uri\":\"http://hana.hb.sapij.com/innojam/team05/honeymoney/services/transactionData.xsodata/transactionData(38)\",\"type\":\"innojam.team05.honeymoney.services.transactionDataType\"},\"ID\":38,\"USER_ID\":1,\"AMOUNT\":\"-210.00\",\"TRAN_DATE\":\"2014-03-24\",\"POST_DATE\":\"2014-03-24\",\"EVENT\":\"Wedding\",\"DESCRIPTION\":\"My Sister, Good Present\"},{\"__metadata\": {\"uri\":\"http://hana.hb.sapij.com/innojam/team05/honeymoney/services/transactionData.xsodata/transactionData(31)\",\"type\":\"innojam.team05.honeymoney.services.transactionDataType\"},\"ID\":31,\"USER_ID\":1,\"AMOUNT\":\"-30.00\",\"TRAN_DATE\":\"2014-03-17\",\"POST_DATE\":\"2014-03-17\",\"EVENT\":\"BirthDay\",\"DESCRIPTION\":\"College Friend\"},{\"__metadata\": {\"uri\":\"http://hana.hb.sapij.com/innojam/team05/honeymoney/services/transactionData.xsodata/transactionData(30)\",\"type\":\"innojam.team05.honeymoney.services.transactionDataType\"},\"ID\":30,\"USER_ID\":1,\"AMOUNT\":\"-15.00\",\"TRAN_DATE\":\"2014-03-05\",\"POST_DATE\":\"2014-03-05\",\"EVENT\":\"Party\",\"DESCRIPTION\":\"Graduation\"},{\"__metadata\":{\"uri\":\"http://hana.hb.sapij.com/innojam/team05/honeymoney/services/transactionData.xsodata/transactionData(332)\",\"type\":\"innojam.team05.honeymoney.services.transactionDataType\"},\"ID\":332,\"USER_ID\":1,\"AMOUNT\":\"-15\",\"TRAN_DATE\":\"2014-03-14\",\"POST_DATE\":\"2014-03-14\",\"EVENT\":\"Party\",\"DESCRIPTION\":\"Grun Kohl Tour\", \"EVENT\": \"Party\"},{\"__metadata\":{\"uri\":\"http://hana.hb.sapij.com/innojam/team05/honeymoney/services/transactionData.xsodata/transactionData(24)\",\"type\":\"innojam.team05.honeymoney.services.transactionDataType\"},\"ID\":24,\"USER_ID\":1,\"AMOUNT\":\"-10\",\"TRAN_DATE\":\"2014-04-26\",\"POST_DATE\":\"2014-04-26\",\"EVENT\":\"BirthDay\",\"DESCRIPTION\":\"Friend of friend John\"}]}}");
		
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
	        		outputHTML = outputHTML + "<td style='color:green;'>&euro;" + obj["AMOUNT"] + "</td>";
	        	}	        	
		        
		        outputHTML = outputHTML + "<td>" + obj["TRAN_DATE"] + "</td>";
		        outputHTML = outputHTML + "<td>" + obj["EVENT"] + "</td>";
		        descr = obj["DESCRIPTION"];
		        
		        if (descr.length > 20){
		        	
		        	descr = descr.substring(0,20) + '...';
		        }
		        
		        outputHTML = outputHTML + "<td>" + descr + "</td>";
	        outputHTML = outputHTML + "</tr>";	           
	    }	 
	
	outputHTML = outputHTML + "</table>";
	
	document.getElementById("predictedTransactionsContainer").innerHTML = outputHTML;
	
	 makeBannerInvisible();
} 


function renderDataToChart(data){
	
	var chart = new CanvasJS.Chart("chartContainer", data);
	chart.render();
	
	makeBannerInvisible()
}


function renderDataToChartPrediction(data){
	
	var chart = new CanvasJS.Chart("chartContainerPrediction", data);
	chart.render();
	
	makeBannerInvisible()
}

function makeBannerInvisible(){
	
	//document.getElementById("dummyTransactionsTable").style.visibility='invisible';
	//document.getElementById("dummyTransactionsTable").style.display = 'none';	
	document.getElementById("waitBanner").style.display = 'none';
}
	


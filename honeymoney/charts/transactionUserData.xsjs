var DB_SCHEMA = "DEMOUSER00";
var TABLE_NAME = "TBL_TRANS_DATA";

var query_sum = "SELECT SUM(\"AMOUNT\") as \"AMOUNT\", MONTH(\"TRAN_DATE\") AS \"MONTH_\"" +
			"FROM \""+ DB_SCHEMA + "\".\"" + TABLE_NAME + "\" as \"TRANS\" " +
			"where \"TRANS\".\"USER_ID\" = 1 " +
			"group by \"TRANS\".\"USER_ID\", MONTH(\"TRAN_DATE\")";

function close(closables) {  
	  var closable;  
	  var i;  
	  for (i = 0; i < closables.length; i++) {  
	            closable = closables[i];  
	            if(closable) {  
	                      closable.close();  
	            }  
	  }  
} 

function getUserTransactionsForLineChart(){
	
    
    var connection = $.db.getConnection();  
    var statement = null;  
    var resultSet = null;
    
    var resultJSON = {};    
    var titleJSON = {};
    
    titleJSON.text = "Month Expences Data (green, red)";    
    resultJSON.title = titleJSON;
     
	var data = [];
	    
    try{  
              statement = connection.prepareStatement(query_sum);  
              resultSet = statement.executeQuery();
              
              var dataPointsHistoryPositive = [];
              var dataPointsHistoryNegative = [];
              
              while (resultSet.next()) {
            		var dataPoint = {};
            		if (resultSet.getInteger(1) > 0){
            			dataPoint.y = resultSet.getInteger(1) + 100;
            			dataPoint.x = resultSet.getInteger(2);                        
            			dataPointsHistoryPositive.push(dataPoint); 
            		} else {
            			dataPoint.y = resultSet.getInteger(1);
            			dataPoint.x = resultSet.getInteger(2);                        
            			dataPointsHistoryNegative.push(dataPoint);  
            		}
            	}
              
              data.push({type:"column", color:"green", dataPoints: dataPointsHistoryPositive});
              data.push({type:"column", color:"red", dataPoints: dataPointsHistoryNegative});
              
              var dataPointsPredictions = [];
//              
//              for (var i = 0; i<2; i++){
//            	  var dataPoint = {};
//            	  dataPoint.y = 1010 + i;
//            	  dataPoint.x = 11 + i;                        
//            	  dataPointsPredictions.push(dataPoint);
//              }
//             
//              
//              
//              data.push({type:"column", color:"purple", dataPoints: dataPointsPredictions});
              
    } finally {  
              close([resultSet, statement, connection]);  
    }  
    
    resultJSON.data = data;
    
    return resultJSON;  
}  


function doGetDataForLineChart() {  
          try{  
                $.response.contentType = "application/json";  
                $.response.setBody(JSON.stringify(getUserTransactionsForLineChart()));  
          }  
          catch(err){  
                $.response.contentType = "text/plain";  
                $.response.setBody("Error while executing query: [" + err.message + "]");  
                $.response.returnCode = 200;  
          }  
}  


doGetDataForLineChart();

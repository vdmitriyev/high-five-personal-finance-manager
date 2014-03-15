var DB_SCHEMA = "<sap-hana-cloud-schema-name>";

var NAMESPACE = "<sap-hana-cloud-username>trial.cloudhoneymoney.honeymoney.data";
var TRANS_TABLE_NAME = "tbl_trans_data";
var FULL_TRANS_TABLE_NAME = NAMESPACE + "::" + TRANS_TABLE_NAME;

var query = "SELECT SUM(\"AMOUNT\"), \"CATEGORY_TEXT\" " +
		"FROM \"" + DB_SCHEMA + "\".\"" + FULL_TRANS_TABLE_NAME + "\" " +
		"WHERE \"USER_ID\" = 1 "+
		"group by \"USER_ID\", \"CATEGORY_TEXT\"";

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

function getTransactionsForCharts(){
	
    
     var connection = $.db.getConnection();  
     var statement = null;     
     var resultSet = null;
     
     var category = {};  
     
     // var resultJSON = {};    
     var titleJSON = {};
     
     titleJSON.text = "User Spend Money";    
     category.title = titleJSON;
     
     var data = [];
     try{  
		        statement = connection.prepareStatement(query);  
		        resultSet = statement.executeQuery();
		        var dataPoints = [];
		        
		        while (resultSet.next()) {  
	                  var transactionData = {}; 
	                  if (resultSet.getDouble(1) < 0) {
		                  transactionData.y = resultSet.getDouble(1);
		                  transactionData.legendText = resultSet.getString(2);
		                  transactionData.indexLabel = resultSet.getString(2);
		                  dataPoints.push(transactionData);
	                  }
		        }
		        
		        data.push({type:"pie", showInLegend:"true", dataPoints: dataPoints});
		        
		        var dataPointsPredictions = [];
//              
//              for (var i = 0; i<2; i++){
//              var dataPoint = {};
//              dataPoint.y = 1010 + i;
//              dataPoint.x = 11 + i;                        
//              dataPointsPredictions.push(dataPoint);
//              }
//             
//              
//              
//              data.push({type:"column", color:"purple", dataPoints: dataPointsPredictions});
		        
		        
     } finally {  
               close([resultSet, statement, connection]);  
     }  
     
     category.data = data;
     
     return category; 
     
}  


function doGetCharts() {  
          try{  
                $.response.contentType = "application/json";  
                $.response.setBody(JSON.stringify(getTransactionsForCharts()));  
          }  
          catch(err){  
                $.response.contentType = "text/plain";  
                $.response.setBody("Error while executing query: [" + err.message + "]");  
                $.response.returnCode = 200;  
          }  
}  


doGetCharts();
var DB_SCHEMA = "<sap-hana-cloud-schema-name>";

var NAMESPACE = "<sap-hana-cloud-username>trial.cloudhoneymoney.honeymoney.data";
var TRANS_TABLE_NAME = "tbl_trans_data";
var FULL_TRANS_TABLE_NAME = NAMESPACE + "::" + TRANS_TABLE_NAME;

var USERS_TABLE_NAME = "tbl_users";
var FULL_USERS_TABLE_NAME = NAMESPACE + "::" + USERS_TABLE_NAME;

var query_sum = 
" SELECT \"TBL_AMOUNT\".\"USER_SUM\", CONCAT(CONCAT(\"USERS\".\"NAME\",' '), \"USERS\".\"SURNAME\")" +
" FROM (" +
" SELECT sum(AMOUNT) as \"USER_SUM\", \"USER_ID\"" +
" FROM " + DB_SCHEMA + ".\"" + FULL_TRANS_TABLE_NAME + "\"" +
"GROUP BY \"USER_ID\" "+
") as \"TBL_AMOUNT\", \"" + DB_SCHEMA + "\".\""+ FULL_USERS_TABLE_NAME + "\" as \"USERS\"" +
" WHERE \"TBL_AMOUNT\".\"USER_ID\" = \"USERS\".\"ID\"";

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
    
    var resultJSON = {};    
    var titleJSON = {};
    
    titleJSON.text = "Bank Users Overview";    
    resultJSON.title = titleJSON;
     
	var data = [];
	    
    try{  
              statement = connection.prepareStatement(query_sum);  
              resultSet = statement.executeQuery();
              
              var dataPoints = []; 
              while (resultSet.next()) {
              var dataPoint = {};
	              dataPoint.y = resultSet.getInteger(1);
	              dataPoint.legendText = resultSet.getString(2);
	              dataPoint.indexLabel = resultSet.getString(2);                            		
	              dataPoints.push(dataPoint);  
              }
              
              data.push({type:"pie", showInLegend:"true", dataPoints: dataPoints});
              
    } finally {  
              close([resultSet, statement, connection]);  
    }  
    
    resultJSON.data = data;
    
    return resultJSON;  
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
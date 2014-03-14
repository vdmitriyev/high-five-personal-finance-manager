//var query = "SELECT * " +
//		"FROM \"TEAM05\".\"tlb_trans_data\" " +
//		"WHERE \"USER_ID\" = 1 "
//		"ORDER BY \"TEAM05\".\"TRAN_DATE\" ASC";

// var DB_SCHEMA = "TEAM05";

var DB_SCHEMA = "DEMOUSER00";
var TABLE_NAME = "TBL_TRANS_DATA";

var query = "SELECT *" + 
"FROM \"" + DB_SCHEMA + "\".\"" + TABLE_NAME + "\" " +
"WHERE \"USER_ID\" = 1 " + 
"ORDER BY \"TRAN_DATE\" ASC";

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
     
     titleJSON.text = "Forecast";    
     category.title = titleJSON;
     
//     var axisXJSON = {};
//     
//     axisXJSON.valueFormatString = "YYY-MM-DD";
//     axisXJSON.interval = 10;
//     axisXJSON.intervalType = "day",
//     axisXJSON.labelAngle = -50;
//     axisXJSON.labelFontColor = "rgb(0,75,141)";
//     axisXJSON.minimum = "new Date(2013,04,01)";
//     
//     
//     category.axisX = axisXJSON;
     
     var data = [];
     
     try{  
		        statement = connection.prepareStatement(query);  
		        resultSet = statement.executeQuery();
		        
		        var dataPointsHistoryPositive = [];
	            // var dataPointsHistoryNegative = [];
	            var current_balance = 0;
	            var cur_date = 0;
	            var counter = 0;
	            while (resultSet.next()) {
	                  counter = counter + 1;
	                  var dataPoint = {};
	                  current_balance = current_balance + resultSet.getDouble(1);
	                  dataPoint.y = current_balance;              
	                  dataPoint.x = cur_date;
	                  
	                  if (counter % 10 === 0){
	                  dataPoint.indexLabel = resultSet.getString(4);
	                  }
	              
	                  dataPointsHistoryPositive.push(dataPoint);
	                   
	                  cur_date = cur_date + 31;
	                    
	                  }
	                  
	              data.push({type:"line", color:"green", dataPoints: dataPointsHistoryPositive});
	             
		        
		      var dataPointsPredictions = [];
		      cur_date = cur_date + 31; 
		      current_balance = current_balance / 1.3;
		      
		      var arr_values = [0,1000,0,10000,0,10000,0,10,0,10000,0];
		      for (var i = 0; i < 10; i++){
		              var dataPoint = {};
		              current_balance  = current_balance - Math.floor(Math.random()*arr_values[i]);
		              if (current_balance < 0){
		              current_balance  = 5000;
		              }
		              dataPoint.y = current_balance;
		              dataPoint.x = cur_date + 60*i;
		              cur_date = cur_date + i;
		              dataPointsPredictions.push(dataPoint);
		              
		              }
             
              data.push({type:"column", color:"purple", dataPoints: dataPointsPredictions});
		        
		        
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
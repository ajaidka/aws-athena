/**
* It execcutes the query string
* returns the `QueryExecutionId`
* `QueryExecutionId` is used to fetch the results saved on OutputLocation
*/
var AWS = require('aws-sdk');
var configProperties = require('../config/config');

var athena = new AWS.Athena(configProperties.awscred);

var params = {
  QueryString: 'SELECT * FROM portfolioManagement.account', 
  ResultConfiguration: { 
    OutputLocation: configProperties.outputLocation, 
  },
  QueryExecutionContext: {
    Database: 'portfolioManagement'
  }
};

athena.startQueryExecution(params, function(err, data) {
  
  if (err) {
    console.log(err, err.stack);
  }
  else  {
    console.log(data);           
    var param = {
      QueryExecutionId: data.QueryExecutionId, 
    };
    athena.getQueryResults(param, function (err, data) {
      if (err) {
        console.log(err, err.stack); 
      }
      else{
        console.log(JSON.stringify(data.ResultSet.Rows));       
      }    
    });
  }  
});
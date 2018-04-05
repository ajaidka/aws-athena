/**
 * It executes the join query
 * returns the `QueryExecutionId`
 * `QueryExecutionId` is used to fetch the results saved on OutputLocation
 */
var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/config.json');
var athena = new AWS.Athena();

var params = {
    QueryString: 'select p.id as portfolioId ,  p.name as portfolioName , a.id as accountId , a.name as accountName  from portfolioManagement.account a join portfolioManagement.portfolio p on a.portfolioid = p.id', 
    ResultConfiguration: { 
        OutputLocation: 's3://aws-athena-query-results-5262-3848-1292-region', 
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
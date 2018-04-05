/**
 * It fetches max time from iot_data_management.iot on AWS Athena
 * Compares it with Current time
 * Gives error if time Difference < 5 or time Difference > 10
 */
var AWS = require('aws-sdk');
var configProperties = require('./config/config.json');
var athena = new AWS.Athena(configProperties.awscred);
var moment = require('moment');
var AWSObjectToJSON = require('./helper/compute').AWSFormatToJSON;
var params = {
    QueryString: 'SELECT max(time) as time FROM iot limit 10;', 
    ResultConfiguration: { 
        OutputLocation: configProperties.outputLocation, //Output location (S3)
    },
    QueryExecutionContext: {
        Database: configProperties.database
    }
};

/**
 * Executes the above mentioned query
 * It returns the `QueryExecutionId`
 * 
 */
athena.startQueryExecution(params, function(err, data) {
    
    if (err) {
        console.log(err, err.stack);
    }
    else  {
       
        var param = {
            QueryExecutionId: data.QueryExecutionId, 
        };

        /**
         * `QueryExecutionId` is used as param to fetch the result of executed query saved on S3
         */
        athena.getQueryResults(param, function (err, data) {
            if (err) {
                console.log(err, err.stack); 
            }
            else{
                data = AWSObjectToJSON(data.ResultSet.Rows)
                
                var maxTime = moment(Number(data[0].time));
                
                var now = moment();
                var difference = now.diff(maxTime, 'seconds')
                console.log(now.diff(maxTime, 'seconds'))
                if(difference < 5 || difference > 10){
                    console.log('Warning: Either Time Difference < 5 or Difference > 10')
                }
                else{
                    console.log('Its fine')
                }
            }    
        });
    }  
});
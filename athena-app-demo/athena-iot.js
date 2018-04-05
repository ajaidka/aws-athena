var AWS = require('aws-sdk');
var athena = new AWS.Athena({ region: 'us-east-1' });
var moment= require('moment');
var AWSObjectToJSON = require('./compute').AWSFormatToJSON;
var params = {
    QueryString: 'SELECT max(time) as time FROM "iot_data_management"."iot" limit 10;', 
    ResultConfiguration: { 
        OutputLocation: 's3://aws-athena-query-results-5262-3848-1292-region', 
    },
    QueryExecutionContext: {
        Database: 'iot_data_management'
    }
};

athena.startQueryExecution(params, function(err, data) {
    
    if (err) {
        console.log(err, err.stack);
    }
    else  {
        // console.log(data);
        //   a.diff(b)
       
        var param = {
            QueryExecutionId: data.QueryExecutionId, 
        };
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
                if(difference<5 || difference>10){
                    console.log('Error: Either Time Difference < 5 or Difference > 10')
                }
                else{
                    console.log('Its fine')
                }
                // console.log(JSON.stringify(data.ResultSet.Rows));       
            }    
        });
    }  
});
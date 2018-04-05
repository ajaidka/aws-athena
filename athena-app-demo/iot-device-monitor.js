/**
* It fetches max time from iot_data_management.iot on AWS Athena
* Compares it with Current time
* Gives error if time Difference < 5 or time Difference > 10
*/
var AWS = require('aws-sdk');
var util = require('util');
var configProperties = require('./config/config');
var athena = new AWS.Athena(configProperties.awscred);

var AWSObjectToJSON = require('./helper/compute').AWSFormatToJSON;
var params = {
    QueryString: 'SELECT id,max(time) as time FROM "iot_data_management"."iot" group by id;',
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
athena.startQueryExecution(params, function (err, data) {

    if (err) {
        console.log(err, err.stack);
    }
    else {

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
            else {
                var maxTime = []
                var now = new Date().getTime()
                var difference = 0;

                data = AWSObjectToJSON(data.ResultSet.Rows)
                data.map(object => {
                    difference = (now - object.time)/1000;

                    // minThrashold is 5, maxThrashold is 10 (seconds)
                    if (difference < 5 || difference > 10) {
                        console.log('Threshold Warning for deviceId - %s:', object.id)
                    }
                    else {
                        console.log('Its fine')
                    }
                })

            }
        });
    }
});
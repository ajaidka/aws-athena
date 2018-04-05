/**
 * It creates a `QueryString`
 * Saves it on the Athena
 */
var AWS = require('aws-sdk');
var configProperties = require('../config/config');
var athena = new AWS.Athena(configProperties.awscred);

var params = {
    Database: 'portfolioManagement', /* required */
    Name: 'ddl-portfolio-test-1', /* required */
    QueryString: 'SELECT * FROM portfolio', /* required */
};
athena.createNamedQuery(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
});
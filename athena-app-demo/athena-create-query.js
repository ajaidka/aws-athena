var AWS = require('aws-sdk');
var athena = new AWS.Athena({ region: 'us-east-1' });

var params = {
    Database: 'portfolioManagement', /* required */
    Name: 'ddl-portfolio-test', /* required */
    QueryString: 'SELECT * FROM portfolio', /* required */
    // ClientRequestToken: 'STRING_VALUE',
    // Description: 'STRING_VALUE'
};
athena.createNamedQuery(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
});
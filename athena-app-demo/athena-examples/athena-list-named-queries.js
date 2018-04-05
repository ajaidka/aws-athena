/**
* Returns the list on `NamedQueryIds`
*/
var AWS = require('aws-sdk');
var configProperties = require('../config/config.json');
var athena = new AWS.Athena(configProperties.awscred);


athena.listNamedQueries({}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
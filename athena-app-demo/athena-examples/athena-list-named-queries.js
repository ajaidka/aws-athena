/**
 * Returns the list on `NamedQueryIds`
 */
var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/config.json');
var athena = new AWS.Athena();


var params = {
};
athena.listNamedQueries(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
var AWS = require('aws-sdk');
var athena = new AWS.Athena({ region: 'us-east-1' });


var params = {
};
athena.listNamedQueries(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
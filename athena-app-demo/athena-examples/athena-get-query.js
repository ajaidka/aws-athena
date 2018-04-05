/**
 * It uses `NamedQueryIds` to fetch the saved query from Athena
 */
var AWS = require('aws-sdk');
var configProperties = require('../config/config.json');
var athena = new AWS.Athena(configProperties.awscred);
var params = {
    NamedQueryIds: [ /* required */
        '4fcc4bc3-2008-4302-9f32-4e9429c8dac0',
        /* more items */
    ]
};
athena.batchGetNamedQuery(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
});
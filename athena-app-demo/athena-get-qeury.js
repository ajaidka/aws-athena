var AWS = require('aws-sdk');
var athena = new AWS.Athena({ region: 'us-east-1' });
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
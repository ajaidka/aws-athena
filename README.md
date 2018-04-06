# aws-athena
Example code on how to use aws-athena SDK to query CSV files living on S3

1. In order to run the example, make sure config.json file is populated with correct credentials, S3 output buckey and other information.
2. iot-device-monitor.js has a very basic example of quering a table on Athena
3. Copy the `S3-datafiles` folder in a bucket on S3, it contains the sample csv files to run the `iot-device-monitor.js`
4. More example are under package athena-examples, some are still under improvements 
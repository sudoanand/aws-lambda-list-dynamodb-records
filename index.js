//Configuration
const REGION = "us-east-1";
const DB_TABLE_NAME = "Attachement";

//Do not edit below this line
var AWS = require('aws-sdk');
AWS.config.update({region: REGION});
const dynamodb = new AWS.DynamoDB.DocumentClient();

scanTable = async () => {
    const params = {
        TableName: DB_TABLE_NAME,
    };

    const scanResults = [];
    let items = [];
    do{
        items =  await dynamodb.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return scanResults;

};

app =  async (event) => {
   const data =  await scanTable();
   const response = {
        statusCode: 200,
        body: JSON.stringify(data),
    };
    return response;
}

exports.handler = app;
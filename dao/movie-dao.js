var aws=require('aws-sdk');
var ConfigurationOptions =require('aws-sdk/lib/config');
const awsConfig = {
  region: process.env.MOVIE_API_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
console.log(awsConfig);

aws.config.update(awsConfig);

const dynamodb = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient(); // subset of functionality of dynamodb


exports.createMovieTable =function() {
  dynamodb.createTable({
    TableName: 'movies',
    KeySchema: [
      {AttributeName: 'year', KeyType: 'HASH'},
      {AttributeName: 'title', KeyType: 'RANGE'}
    ],
    AttributeDefinitions: [
      {AttributeName: 'year', AttributeType: 'N'},
      {AttributeName: 'title', AttributeType: 'S'}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 2,
      WriteCapacityUnits: 2
    }
  }, (err, data) => {
    if (err) {
      console.log(`Unable to creat table: \n ${JSON.stringify(err, undefined, 2)}`);
    } else {
      console.log(`Created table: \n ${JSON.stringify(data, undefined, 2)}`);
    }
  });
}

exports.saveMovie=function(movie)  {
  return docClient.put({
    TableName: 'movies',
    Item: movie
  }).promise();
}

exports.findAllByYear =function(year)  {
  return docClient.query({
    TableName: 'movies',
    KeyConditionExpression: '#yr = :yyyy',
    ExpressionAttributeNames: { // for aliasing field names
      '#yr': 'year'
    },
    ExpressionAttributeValues: { // for aliasing actual values
      ':yyyy': year
    },
    // ReturnConsumedCapacity: 'TOTAL' // not needed but if you want to see this info it is there

  }).promise();
}

exports.findByYearAndTitle =function(year , title) {
  console.log(`finding movie with title: ${title}
  and year: ${year}`);
  return docClient.get({
    TableName: 'movies',
    Key: {
      year: year,
      title: title
    }
  }).promise();
}

exports.update =function(movie){
  return docClient.update({
    TableName: 'movies',
    Key: {
      year: movie.year,
      title: movie.title
    },
    UpdateExpression: 'set #rat = :r, #desc = :desc',
    ExpressionAttributeNames: {
      '#desc': 'description',
      '#rat': 'rating'
    },
    ExpressionAttributeValues: {
      ':r': movie.rating,
      ':desc': movie.description
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise();
}

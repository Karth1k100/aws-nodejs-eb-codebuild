// Load the AWS SDK
var AWS = require('aws-sdk')

var express = require('C:/Users/Luillo/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/express')
var bodyParser = require('C:/Users/Luillo/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/body-parser')

// Set region for AWS SDKs
AWS.config.region = process.env.REGION

var app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({extended:false}))
 

app.get('/', function (req, res) {
  res.render('index', {
    title: 'This is a test'
    })
    res.status(200).end();
})
app.get('/test-endpoint', (req, res) => {
  res.json({content: 'hello Karthik'});
});

app.use('/movies', movieRouter);
app.use('/users', userRouter);
var port = process.env.PORT || 3000

var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/')
})

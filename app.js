require('dotenv').config();
const express = require('express');

const path = require("path");
const mongdb = require('mongodb')
const bodyParser = require('body-parser');

const dbCon = mongdb.MongoClient.connect('mongodb://localhost:27017/test_database', { useNewUrlParser: true })

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(process.env.PORT);


app.post('/register', (req, res) => {
    dbCon.then((client) => {
        //delete.req.body._id;
        client.db().collection('feedbacks').insertOne(req.body);
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
})


// will work on query to read req.body inputs in form field
// app.get('/view-feedbacks', (req, res) => {
//     // res.sendFile(path.resolve(__dirname + 'index.html'))
//     dbCon.then(function (db) {
//         dbCon.collection('feedbacks').find({}).toArray().then(function (feedbacks) {
//             res.status(200).json(feedbacks);
//         });
//     });
// });



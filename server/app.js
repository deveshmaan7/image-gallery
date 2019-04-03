const express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let fs = require('fs');
require('./config/database');
const app = express();
app.use(cors());

// body-parser middleware

app.use(bodyParser.json({limit: '100kb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100kb', extended: true}))

app.get('/', function (req, res) {
    res.send("Hello");
})

app.get('/allImages', function (req, res) {
    let data = fs.readFileSync('gallery.json');
    let images = JSON.parse(data)
    res.send({status: 200, message: "success", data: images});
})

app.post('/image', function (req, res) {

    let imageData = req.body.file
    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        return response;
    }

    let data = decodeBase64Image(imageData);
    let newData = []

    // fetch existing data
    let existingData = fs.readFileSync('gallery.json');
    let parsedExistingData = JSON.parse(existingData)

    // push new data to array
    newData.push(data)

    if (existingData.length > 5) {

        // push new data into existing array

        newData.push.apply(newData, parsedExistingData)
        fs.writeFile('gallery.json', JSON.stringify(newData), (err) => console.log(err));
    }
    else {
        // Now data is in string
        fs.writeFile('gallery.json', JSON.stringify(newData), (err) => console.log(err));
    }

    res.send({status: 200, message: "success"});
})

app.listen(5000, function () {
    console.log('Express server is up on port 5000');
});




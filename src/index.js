import express from 'express';

const app = express();

// root
app.get('/', function(req, res) {
    res.json('Hello World');
});

// clarifai
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105' ;
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": process.env.USER_ID,
        "app_id": process.env.APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + process.env.PAT
    },
    body: raw
};

app.get('/clarifai', function(req, res) {
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.text())
    .then(result => res.json(result))
    .catch(error => console.log('error', error));
});

// POST signIn
app.post('/signIn', function(req, res) {
    if(req.body.email === 'conk@gmail.com' && req.body.password === '123') {
        res.json('sign in');
    } else {
        res.json('could not sign in');
    }
});

// POST signUp
app.post('/signUp', function(req, res) {
    res.json('sign up');
});

// GET user
app.get('/user', function(req, res) {
    res.json('user');
});

// UPDATE entries
app.put('/entries', function(req, res) {
    res.json('entries');
});

app.listen(3000);
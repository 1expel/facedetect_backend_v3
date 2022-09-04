import express from 'express';

const app = express();

// root
app.get('/', function(req, res) {
    res.send('Hello World');
});

// clarifai


// POST signIn
app.post('/signIn', function(req, res) {
    res.send('sign in');
});

// POST signUp
app.post('/signUp', function(req, res) {
    res.send('sign up');
});

// GET user
app.get('/user', function(req, res) {
    res.send('user');
});

// UPDATE entries
app.update('/entries', function(req, res) {
    res.send('entries');
});

app.listen(3000);
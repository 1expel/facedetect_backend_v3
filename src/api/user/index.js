import { Router } from 'express';

const userRouter = Router();

// POST signIn
userRouter.post('/signIn', function(req, res) {
    if(req.body.email === 'conk@gmail.com' && req.body.password === '123') {
        res.json('sign in');
    } else {
        res.json('could not sign in');
    }
});

// POST signUp
userRouter.post('/signUp', function(req, res) {
    res.json('sign up');
});

// GET user
userRouter.get('/user', function(req, res) {
    res.json('user');
});

// UPDATE entries
userRouter.put('/entries', function(req, res) {
    res.json('entries');
});

export default userRouter;
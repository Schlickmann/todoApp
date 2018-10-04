const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todoApp', { useNewUrlParser: true });
require('./todo');

const Todo = mongoose.model('Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    return res.json(todos);
});

app.post('/todos', async (req, res) => {
    const todo = await Todo.create(req.body);
    return res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    const todos = await Todo.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
});

app.put('/todos/:id', async (req, res) => {
    const todos = await Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, product) => {
        if (err) return next(err);
        res.send('Product udpated.');
    });
});

app.listen(5555);
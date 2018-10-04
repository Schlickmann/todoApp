const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    todoName: {
        type: String,
        required: true
    },
    todoDescription: {
        type: String,
        required: false
    },
    todoAddendum: {
        type: String,
        data: Buffer,
        required: false
        
    },
    todoDone: {
        type: Boolean,
        required: false
    }
});

mongoose.model('Todo', TodoSchema);
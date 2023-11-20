const Mongoose = require('mongoose');

const TodoSchema = new Mongoose.Schema({
    id: { type: Object },
    idUser: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    expiredate: {
        type: Date,
        required: true
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('Todo', TodoSchema);
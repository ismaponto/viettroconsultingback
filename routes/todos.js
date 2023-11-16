const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse.js');
const Todo = require('../schema/todo.js');

router.get('/', (req, res) => {
    res.status(200).json(jsonResponse(200, [{
        id: 1,
        tittle: 'Hello World',
        body: 'This is a test',
        completed: false,
        expiredate: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date,

    }, {
        id: 2,
        tittle: 'Hello World2',
        body: 'This is a test2',
        completed: false,
        expiredate: new Date().toISOString(),
        created_at: new Date().toISOString(),
    }]))
})

router.put('/todos/:id', async(req, res) => {
    if (!req.body) {
        res.status(400).json(jsonResponse(200, {
            message: 'Tiene que estar completo'
        }))
        try {
            const todoId = new Todo({
                idUser: req.user.id,
                title: req.body.title,
                completed: false,
                expiredate: req.body.expiredate
            });
            const newTodo = await Todo(save);
            return res.status(200).json(jsonResponse(200, { message: 'hubo un error en la solicitud', data: newTodo }));

        } catch (error) {
            return res.status(400).json(jsonResponse(400, { error: 'hubo un error en la solicitud' }));
        }
    }
    const updatedTodo = req.body; // Datos actualizados de la tarea

    // Encuentra la tarea con el ID correspondiente y actualízala
    todos = todos.map((todo) => (todo.id === todoId ? {...todo, ...updatedTodo } : todo));

    res.json({ success: true, message: 'Tarea actualizada correctamente' });
});

module.exports = router
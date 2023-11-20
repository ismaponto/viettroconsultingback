const router = require('express').Router();
const { jsonresponse } = require('../lib/jsonresponse.js');
const Todo = require('../schema/todo.js');

router.get('/', async(req, res) => {
    try {
        const idUser = req.user.email._id
            // Aquí deberías obtener los datos desde tu fuente de datos(base de datos, API, etc.)
        const todos = await Todo.find({ idUser }); // Suponiendo que utilizas Mongoose para interactuar con MongoDB
        if (todos.length === 0) {
            return res
                .status(200)
                .json(jsonresponse(200, [{ title: 'Indica tu primer objetivo y el plazo para definirlo' }]));
        } else {
            return res.status(200).json(jsonresponse(200, todos));
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return res.status(500).json(jsonresponse(500, { error: 'Hubo un error en la solicitud' }));
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const todoId = req.params.id;



        // Intenta encontrar y eliminar el todo por su ID
        const deletedTodo = await Todo.findByIdAndRemove(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo no encontrado' });
        }

        res.json({ message: 'Todo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar todo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.post('/', async(req, res) => {
    try {
        const { title, completed, expiredate } = req.body;
        const idUser = req.user.email._id;
        // Verifica que los campos requeridos estén presentes
        if (!idUser || !title || expiredate === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Crea un nuevo objeto Todo con los datos proporcionados
        const newTodo = new Todo({
            idUser,
            title,
            completed: completed !== undefined ? completed : false,
            expiredate
        });

        // Guarda el nuevo todo en la base de datos
        const savedTodo = await newTodo.save();

        // Responde con el todo recién creado, incluyendo el ID asignado por MongoDB
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

// router.put('/todos', async(req, res) => {
//     const updatedTodos = req.body; // El cuerpo de la solicitud debe contener un array de todos actualizados

//     try {
//         // Itera sobre el array y actualiza cada todo
//         const updatedTodosPromises = updatedTodos.map(async(updatedTodo) => {
//             const todoId = updatedTodo.id; // Asegúrate de que cada todo tenga un campo 'id' único

//             // Encuentra el todo por su ID
//             const todo = await Todo.findById(todoId);

//             if (!todo) {
//                 return res.status(404).json({ error: `Todo with ID ${todoId} not found` });
//             }

//             // Actualiza los campos según la información proporcionada en el objeto actualizado
//             if (updatedTodo.title) {
//                 todo.title = updatedTodo.title;
//             }

//             if (updatedTodo.completed !== undefined) {
//                 todo.completed = updatedTodo.completed;
//             }

//             if (updatedTodo.expiredate) {
//                 todo.expiredate = updatedTodo.expiredate;
//             }

//             // Guarda el todo actualizado
//             return todo.save();
//         });

//         // Espera a que todas las actualizaciones se completen
//         const updatedTodosResult = await Promise.all(updatedTodosPromises);

//         // Responde con los todos actualizados
//         res.json(updatedTodosResult);
//     } catch (error) {
//         console.error('Error updating todos:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

module.exports = router;
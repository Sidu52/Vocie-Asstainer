const express = require('express');
const router = express.Router();

const { user, createTodo, getUserTodos, getTodoByNameandUserId, updateTodo, deleteTodo } = require('../controller/todocontroller');

router.post('/user', user);
router.post('/todo', createTodo);
router.post('/gettodo', getUserTodos);
router.post('/utodo', getTodoByNameandUserId);
router.put('/todo', updateTodo);
router.post('/deletetodo', deleteTodo);

module.exports = router;
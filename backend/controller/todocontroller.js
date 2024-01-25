const Todo = require('../model/todoSchema');
const User = require('../model/userSchema');
//Create a new Todo
async function user(req, res) {
    try {
        const { nickname } = req.body;
        const user = await User.findOne({ nickname })
        if (user) {
            return res.status(201).json({ message: "User already created", data: user });
        }
        const Create = await User.create({ nickname });
        return res.status(201).json({ message: "User created", data: Create });
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while creating the user`, error: error
        });
    }
}
async function createTodo(req, res) {
    try {
        const { userid, title, completed } = req.body;
        const userFind = await User.findById(userid);
        if (!userFind) {
            return res.status(404).json({ message: "User not found" });
        }
        const todoExists = await Todo.findOne({ title, userid: userFind.id });

        if (todoExists) {
            return res.status(400).json({ message: "Todo already created" });
        }
        const todo = await Todo.create({ title, completed, userid: userFind.id });

        if (todo) {
            return res.status(201).json({ message: "Todo has been created successfully", data: todo });
        } else {
            return res.status(500).json({ message: "Error creating todo" });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while creating the todo: ${error}`,
        });
    }
}


async function getUserTodos(req, res) {
    const { userid } = req.body;
    try {
        const allTodos = await Todo.find({ userid });

        if (allTodos.length > 0) {
            return res.status(200).json({ message: "Todos have been found successfully", data: allTodos });
        } else {
            return res.status(404).json({ message: "Todos not found", data: [] });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while retrieving todos: ${error}`,
        });
    }
}


// Get a Todo by id
async function getTodoByNameandUserId(req, res) {
    const { userid, title } = req.body;
    try {
        const getTodo = await Todo.findOne({ userid, title });
        console.log(getTodo)
        if (getTodo) {
            return res.status(200).json({ message: "User todos found successfully", data: getTodo });
        } else {
            return res.status(404).json({ message: "Todos not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while retrieving the todos: ${error}`,
        });
    }
}


async function updateTodo(req, res) {
    const { title, userid, updatetitle, completed } = req.body;
    try {
        let updateData = {};

        if (updatetitle) {
            updateData.title = updatetitle;
        }

        if (completed !== undefined) {
            updateData.completed = completed;
        }

        const todo = await Todo.findOne({ title, userid });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        const updatedTodo = await Todo.findOneAndUpdate({ title, userid }, updateData, { new: true });

        if (updatedTodo) {
            return res.status(200).json({ message: "Todo updated successfully", data: updatedTodo });
        } else {
            return res.status(500).json({ message: "Error updating the todo" });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while updating the todo: ${error}`,
        });
    }
}

async function deleteTodo(req, res) {
    const { userid, title } = req.body;
    try {
        const getTodo = await Todo.findOneAndDelete({ title, userid });
        if (getTodo) {
            return res.status(200).json({ message: "User todo deleted successfully", data: getTodo });
        } else {
            return res.status(404).json({ message: "Todo not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: `An error occurred while deleting the todo: ${error}`,
        });
    }
}

module.exports = { user, createTodo, getUserTodos, getTodoByNameandUserId, updateTodo, deleteTodo };

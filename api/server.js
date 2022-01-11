// BUILD YOUR SERVER HERE

const express = require("express")
const User = require("./users/model.js")

const server = express()
server.use(express.json())


server.get("/api/users", (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({
                message: "The users information could not be retrieved",
                err: err.message,
                stack: err.stack
            })
        })
})

server.get("/api/users/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be retrieved",
                err: err.message,
                stack: err.stack
            })
        })
})


server.post("/api/users", (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user",
        })
    } else {
        User.insert(newUser)
            .then(createdUser => {
                console.log(createdUser)
                res.status(201).json(createdUser)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the user to the database",
                    err: err.message,
                    stack: err.stack
                })
            })
    }

})

server.put("/api/users/:id", async (req, res) => {
    try {
        const newUser = await User.findById(req.params.id)
        if (!newUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else {
                const updatedUser = await User.update(req.params.id, req.body)
                res.status(200).json(updatedUser)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "error updated users",
            err: err.message,
            stack: err.stack
        })
    }
})


server.delete("/api/users/:id", async (req, res) => {
    try {
        const newUser = await User.findById(req.params.id)
        console.log(newUser)
        if (!newUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            const deletedUser = await User.remove(newUser.id)
            console.log(deletedUser)
            res.status(200).json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({
            message: "The user could not be removed",
            err: err.message,
            stack: err.stack
        })
    }
})


server.use("*", (req, res) => {
    res.status(404).json({
        message: "Api endpoint not found."
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

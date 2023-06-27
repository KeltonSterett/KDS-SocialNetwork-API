const {User, Thought} = require('../models');

model.exports = {
    getUser(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },
    getSingeUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v")
        .then((user) => 
        !user ? res.status(404).json({ message: "No user found with this id!" }) : res.json(user)) 
        .catch((err) => res.status(400).json(err));
    },
}
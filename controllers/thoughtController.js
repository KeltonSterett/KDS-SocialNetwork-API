const {User, Thought} = require('../models');

module.exports = {
    // get all thoughts
    getThought(req, res) {
        Thought.find({})
        .then(thought => res.json(thought))
        .catch(err => res.status(400).json(err));
    },
    // get a single thought by id
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) => 
            !thought ? res.status(404).json({message: 'No thought found with this id!'}) 
            : res.json(thought))
        .catch(err => res.status(400).json(err));
    },
    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then((thought) =>
            !thought ? res.status(404).json({message: 'No thought found with this id!'})
            : res.json(thought))
        .catch(err => res.status(400).json(err));
    },
    // update a thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) =>
            !user ? res.status(404).json({message: 'No thought found with this id!'})
            : res.json(user))
        .catch(err => res.status(400).json(err));
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) =>
            !thought ? res.status(404).json({message: 'No thought found with this id!'})
            : User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            ))
            .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought deleted, but no user found'})
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => res.status(500).json(err));
  },
    // Create a reaction stored in a single thought's reactions array field
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thought) =>
            !thought ? res.status(404).json({message: 'No thought found with this id!'})
            : res.json(thought))
        .catch(err => res.status(400).json(err));
    },
    // delete a reaction by id
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then((thought) =>
            !thought ? res.status(404).json({message: 'No thought found with this id!'})
            : res.json(thought))
        .catch(err => res.status(400).json(err));
    }
};

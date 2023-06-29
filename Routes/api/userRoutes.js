const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users GET and POST routes
router.route('/').get(getUser).post(createUser);

// /api/users/:userId GET, PUT, and DELETE routes by id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId POST and DELETE routes to add and remove a friend to a user's friend list
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
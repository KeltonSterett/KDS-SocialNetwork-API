const router = require('express').Router();
// import the API routes from the /api/index.js file
const apiRoutes = require('./api');
// adding the prefix of `/api` to all of the api routes 
router.use('/api', apiRoutes);

// if route is not found, return 404 status
router.use((req, res) => res.send('Wrong Route!'));

module.exports = router;
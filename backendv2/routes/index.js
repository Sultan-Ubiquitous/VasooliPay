const express = require('express');
const userRouter = require('./user');
const accountsRouter = require('./accounts');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('routes Working!');
});

router.use('/user', userRouter);
router.use('/accounts', accountsRouter);

module.exports = router;
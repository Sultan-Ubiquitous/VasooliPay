const { authMiddleware } = require('../middleware');
const express = require('express');
const router = express.Router();
const { Account } = require('../db');
const mongoose = require('mongoose');


router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.query.userId;
    const account = await Account.findOne({ userId: userId });
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }
    res.json({ balance: account.balance });
});


router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;

    const toAccount = await Account.findOne({
        userId: to,
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: "Invalid recipient" });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
});

module.exports = router;
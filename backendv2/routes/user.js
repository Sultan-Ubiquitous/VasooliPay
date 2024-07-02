const express = require('express');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const zod = require('zod');
const { User, Account } = require('../db');
const { authMiddleware } = require('../middleware');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


const registerSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    email: zod.string(),
    password: zod.string(),
});
 

const loginSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
});

router.get('/', (req, res) => {
    res.send('routes Working!');
});

router.post('/register', async (req, res) => {
    const body = req.body;
    const success = registerSchema.safeParse(body);
    if(!success){
        return res.status(400).json({ error: "Invalid input" });
    }

    const existingUser = await User.findOne({
        username: body.username,
    });

    if(existingUser){
        return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({
        username: body.username,
        firstName: body.firstName,
        email: body.email,
        password: body.password,
    });
    const userId = newUser._id;

    const account = await Account.create({
        userId: userId,
        balance: 1 + Math.floor(Math.random() * 10000),
    });

    
    await newUser.save();
    console.log("user created");
    const token = jwt.sign({ userId: userId }, JWT_SECRET);

    res.json({
        message: "User created",
        userId: userId,
        token: token
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const body = { username, password };
    const success = loginSchema.safeParse(body);

    if(!success){
        return res.status(400).json({ error: "Invalid input" });
    }
    
    const user = await User.findOne({
        username: body.username,
        password: body.password,
    });

    if(!user){
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
        message: "Login successful",
        token: token,
        userId: user._id,
    });
});

router.put('/update', authMiddleware, async (req, res) => {
    const success = registerSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({ error: "Invalid input" });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({ message: "User updated successfully :)" });
});

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    
    const user = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter,
                },
            },
                {
                    username: {
                        "$regex": filter,
                    },
                },
        ]
    });

    res.json({
        user: user.map((user) => {
            return {
                username: user.username,
                firstName: user.firstName,
                email: user.email,
                _id: user._id,
            };
        }),
    })
});
    
module.exports = router; 
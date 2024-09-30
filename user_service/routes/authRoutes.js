const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const router = express.Router();

const genrateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIIRES_IN });
}

router.post('/register', async function (req, res) {
    const { username, email, password } = req.body;

    try {
        const isUserExists = await db.query("SELECT * FROM users WHERE email=$1", [
            email
        ]);
        if (isUserExists.rows.length > 0) {
            return res.status(400).json({ message: "user already exists" })
        }

        const hassedPassword = await bcrypt.hash(password, 10);
        const newuser = await db.query("INSERT INTO users (username,email, password) VALUES($1,$2,$3) RETURNING *", [
            username, email, hassedPassword
        ]);


        return res.status(201).json({ message: "User registration successfully", data: newuser.rows })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})



router.post('/login', async function (req, res) {
    const { email, password } = req.body;

    try {
        const isUserExists = await db.query("SELECT * FROM users WHERE email=$1", [
            email
        ]);
        if (isUserExists.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email and password" });
        }

        const ispasswordIsValid = await bcrypt.compare(password, isUserExists.rows[0].password);
        if (!ispasswordIsValid) {
            return res.status(400).json({ message: "Invalid email and password" });
        }


        const token = genrateToken({
            id: isUserExists.rows[0].id,
            email
        });

        return res.status(201).json({ message: "Login successfull", data: token })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});


router.get('/validate', async function (req, res) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const tokenData = token.split(" ")[1];
        const user = jwt.verify(tokenData, process.env.JWT_SECRET);
        return res.status(201).json({ message: "data", data: { ...user } })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});






module.exports = router;


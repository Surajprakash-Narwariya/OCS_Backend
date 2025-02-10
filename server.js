require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const crypto = require('crypto');

function generateMD5Hash(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

app.post('/login', async (req, res) => {
    const { userid, password_hash } = req.body;

    try {
        const userResult = await pool.query(
            'SELECT * FROM users WHERE userid = $1 AND password_hash = $2',
            [userid, password_hash]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = userResult.rows[0];
        const isAdmin = user.role === 'admin';
        const dataQuery = isAdmin
            ? 'SELECT userid, password_hash, role FROM users'
            : 'SELECT userid, password_hash, role FROM users WHERE userid = $1';
        const dataParams = isAdmin ? [] : [user.userid];

        const dataResult = await pool.query(dataQuery, dataParams);
        res.json(dataResult.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/add-user', async (req, res) => {
    const { userid, password_hash, role } = req.body;
    var hash = generateMD5Hash(password_hash);
    console.log(userid, hash, role);

    try {
        const result = await pool.query(
            'INSERT INTO users (userid, password_hash, role) VALUES ($1, $2, $3)',
            [userid, hash, role]
        );
        res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error inserting user' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;

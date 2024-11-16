import db from '../../lib/database';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

        db.all(query, (err, rows) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            if (rows.length > 0) {
                res.status(200).json({ message: 'Login successful', user: rows[0] });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

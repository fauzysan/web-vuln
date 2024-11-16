import db from '@/lib/database';

export async function POST(req) {
    const body = await req.json();
    const { username, password } = body;

    return new Promise((resolve) => {
        const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

        db.all(query, (err, rows) => {
            if (err) {
                resolve(
                    new Response(JSON.stringify({ error: 'Database error' }), {
                        status: 500,
                    })
                );
            } else if (rows.length > 0) {
                resolve(
                    new Response(JSON.stringify({ message: 'Login successful', user: rows[0] }), {
                        status: 200,
                    })
                );
            } else {
                resolve(
                    new Response(JSON.stringify({ message: 'Invalid credentials' }), {
                        status: 401,
                    })
                );
            }
        });
    });
}

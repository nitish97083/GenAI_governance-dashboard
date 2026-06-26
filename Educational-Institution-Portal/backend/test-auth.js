const http = require('http');

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth' + path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(body) }); }
        catch (e) { resolve({ status: res.statusCode, body: body }); }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  try {
    console.log('Registering test user...');
    const reg = await postJson('/register', { name: 'Test User', email: 'testuser@example.com', password: 'TestPass123' });
    console.log('Register:', reg.status, reg.body);

    console.log('Logging in test user...');
    const login = await postJson('/login', { email: 'testuser@example.com', password: 'TestPass123' });
    console.log('Login:', login.status, login.body);
  } catch (err) {
    console.error(err);
  }
}

run();

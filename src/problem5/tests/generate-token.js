import jwt from 'jsonwebtoken';

// Use the same secret you defined in .env.test
const secret = 'your_super_secret_key_for_testing';

// The payload can be anything you want. For an authenticated user, it often contains the user ID.
const payload = { userId: 123, role: 'user' };

//const token = jwt.sign(payload, secret, { expiresIn: '1h' });
// Sign the token WITHOUT the expiresIn option for testing purpose
const token = jwt.sign(payload, secret);

console.log('Your Test JWT:\n');
console.log(token);
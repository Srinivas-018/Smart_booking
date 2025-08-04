const bcrypt = require('bcryptjs');

// ❗️ Change this to your desired admin password
const myPlainPassword = 'password';

// This generates a secure hash
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(myPlainPassword, salt);

console.log('Plain Password:', myPlainPassword);
console.log('✅ Copy this secure hash and save it in your database password field:');
console.log(hash);
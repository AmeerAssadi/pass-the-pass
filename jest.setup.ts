import dotenv from 'dotenv';

dotenv.config({ path: './.test.env' });

console.log('ENCRYPTION_KEY:', process.env.ENCRYPTION_KEY);

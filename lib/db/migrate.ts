import dotenv from 'dotenv';
dotenv.config();

import { execSync } from 'node:child_process';

console.log('Ensuring DynamoDB tables exist...');
execSync('npx tsx create-dynamo-tables.ts', { stdio: 'inherit' });
console.log('DynamoDB tables ensured.');

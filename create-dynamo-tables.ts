import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';
import type { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.AWS_REGION) {
  console.error('AWS_REGION is not set. Check your .env configuration.');
  process.exit(1);
}
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set.');
  process.exit(1);
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

async function createTable(params: CreateTableCommandInput) {
  try {
    await client.send(new CreateTableCommand(params));
    console.log(`Created table ${params.TableName}`);
  } catch (err: any) {
    if (err.name === 'ResourceInUseException') {
      console.log(`Table ${params.TableName} already exists`);
    } else {
      console.error(`Error creating table ${params.TableName}:`, err);
    }
  }
}

async function main() {
  console.log(`Using region ${process.env.AWS_REGION}`);
  console.log('Creating table: yamada_users');
  await createTable({
    TableName: 'yamada_users',
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    BillingMode: 'PAY_PER_REQUEST'
  });

  console.log('Creating table: yamada_teams');
  await createTable({
    TableName: 'yamada_teams',
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    BillingMode: 'PAY_PER_REQUEST'
  });

  console.log('Creating table: yamada_team_members');
  await createTable({
    TableName: 'yamada_team_members',
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'N' },
      { AttributeName: 'teamId', AttributeType: 'N' }
    ],
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' },
      { AttributeName: 'teamId', KeyType: 'RANGE' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  });

  console.log('Creating table: yamada_activity_logs');
  await createTable({
    TableName: 'yamada_activity_logs',
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    BillingMode: 'PAY_PER_REQUEST'
  });

  console.log('Creating table: yamada_invitations');
  await createTable({
    TableName: 'yamada_invitations',
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    BillingMode: 'PAY_PER_REQUEST'
  });

  console.log('Creating table: yamada_ssh_keys');
  await createTable({
    TableName: 'yamada_ssh_keys',
      AttributeDefinitions: [{ AttributeName: 'key', AttributeType: 'S' }],
      KeySchema: [{ AttributeName: 'key', KeyType: 'HASH' }],
      BillingMode: 'PAY_PER_REQUEST'
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

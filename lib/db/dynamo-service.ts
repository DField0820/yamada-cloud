import { ddb, generateId } from './dynamo';
import {
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import type {
  NewUser,
  User,
  NewTeam,
  Team,
  NewTeamMember,
  TeamMember,
  NewActivityLog,
  ActivityLog,
  Invitation,
  NewInvitation,
  ApiKey,
  NewApiKey
} from './schema';

function itemToNumber<T extends { [key: string]: any }>(item: T | undefined) {
  if (!item) return undefined;
  const converted: any = { ...item };
  for (const key of Object.keys(converted)) {
    if (typeof converted[key] === 'string' && converted[key] !== '') {
      const n = Number(converted[key]);
      if (!isNaN(n)) converted[key] = n;
    }
  }
  return converted as T;
}

export async function createUser(user: NewUser): Promise<User> {
  const id = generateId();
  const item = { ...user, id } as User;
  await ddb.send(
    new PutCommand({ TableName: 'yamada_users', Item: item })
  );
  return item;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const res = await ddb.send(
    new ScanCommand({
      TableName: 'yamada_users',
      FilterExpression: '#e = :email',
      ExpressionAttributeNames: { '#e': 'email' },
      ExpressionAttributeValues: { ':email': email }
    })
  );
  const item = res.Items?.[0] as User | undefined;
  return item ? (itemToNumber(item) as User) : null;
}

export async function findUserById(id: number): Promise<User | null> {
  const res = await ddb.send(
    new GetCommand({ TableName: 'yamada_users', Key: { id } })
  );
  return res.Item ? (itemToNumber(res.Item as User) as User) : null;
}

export async function createTeam(team: NewTeam): Promise<Team> {
  const id = generateId();
  const item = { ...team, id } as Team;
  await ddb.send(new PutCommand({ TableName: 'yamada_teams', Item: item }));
  return item;
}

export async function getTeamById(id: number): Promise<Team | null> {
  const res = await ddb.send(new GetCommand({ TableName: 'yamada_teams', Key: { id } }));
  return res.Item ? (itemToNumber(res.Item as Team) as Team) : null;
}

export async function createTeamMember(member: NewTeamMember): Promise<void> {
  const id = generateId();
  await ddb.send(
    new PutCommand({ TableName: 'yamada_team_members', Item: { ...member, id } })
  );
}

export async function findInvitation(id: number, email: string) {
  const res = await ddb.send(
    new ScanCommand({
      TableName: 'yamada_invitations',
      FilterExpression: 'id = :id and #e = :email and #s = :p',
      ExpressionAttributeNames: { '#e': 'email', '#s': 'status' },
      ExpressionAttributeValues: { ':id': id, ':email': email, ':p': 'pending' }
    })
  );
  return res.Items?.[0] as Invitation | undefined;
}

export async function updateInvitationStatus(id: number, status: string) {
  await ddb.send(
    new UpdateCommand({
      TableName: 'yamada_invitations',
      Key: { id },
      UpdateExpression: 'set #s = :s',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':s': status }
    })
  );
}

export async function logActivity(activity: NewActivityLog): Promise<void> {
  const id = generateId();
  const timestamp =
    typeof activity.timestamp === 'string'
      ? activity.timestamp
      : new Date().toISOString();

  await ddb.send(
    new PutCommand({
      TableName: 'yamada_activity_logs',
      Item: {
        ...activity,
        id,
        timestamp, // ✅ ISO文字列形式を確実に保証
      },
    })
  );
}

export async function updateUserPassword(id: number, passwordHash: string) {
  await ddb.send(
    new UpdateCommand({
      TableName: 'yamada_users',
      Key: { id },
      UpdateExpression: 'set passwordHash = :p',
      ExpressionAttributeValues: { ':p': passwordHash }
    })
  );
}

export async function updateUser(id: number, data: Partial<Pick<User, 'name' | 'email'>>) {
  const expressions: string[] = [];
  const values: Record<string, any> = {};
  if (data.name) {
    expressions.push('#n = :name');
    values[':name'] = data.name;
  }
  if (data.email) {
    expressions.push('#e = :email');
    values[':email'] = data.email;
  }
  if (expressions.length === 0) return;
  await ddb.send(
    new UpdateCommand({
      TableName: 'yamada_users',
      Key: { id },
      UpdateExpression: `set ${expressions.join(', ')}`,
      ExpressionAttributeNames: { '#n': 'name', '#e': 'email' },
      ExpressionAttributeValues: values
    })
  );
}

export async function markUserDeleted(id: number) {
  await ddb.send(
    new UpdateCommand({
      TableName: 'yamada_users',
      Key: { id },
      UpdateExpression: 'set deletedAt = :d',
      ExpressionAttributeValues: { ':d': new Date().toISOString() }
    })
  );
}

export async function removeTeamMember(memberId: number, teamId: number) {
  await ddb.send(
    new DeleteCommand({
      TableName: 'yamada_team_members',
      Key: { id: memberId, teamId }
    })
  );
}

export async function findExistingMember(email: string, teamId: number) {
  const res = await ddb.send(
    new ScanCommand({
      TableName: 'yamada_users',
      FilterExpression: '#e = :email',
      ExpressionAttributeNames: { '#e': 'email' },
      ExpressionAttributeValues: { ':email': email }
    })
  );
  const user = res.Items?.[0] as User | undefined;
  if (!user) return false;
  const tm = await ddb.send(
    new ScanCommand({
      TableName: 'yamada_team_members',
      FilterExpression: 'userId = :u and teamId = :t',
      ExpressionAttributeValues: { ':u': user.id, ':t': teamId }
    })
  );
  return (tm.Items?.length || 0) > 0;
}

export async function findExistingInvitation(email: string, teamId: number) {
  const res = await ddb.send(
    new ScanCommand({
      TableName: 'yamada_invitations',
      FilterExpression: '#e = :email and teamId = :t and #s = :p',
      ExpressionAttributeNames: { '#e': 'email', '#s': 'status' },
      ExpressionAttributeValues: { ':email': email, ':t': teamId, ':p': 'pending' }
    })
  );
  return (res.Items?.length || 0) > 0;
}

export async function createInvitation(inv: NewInvitation) {
  const id = generateId();
  await ddb.send(
    new PutCommand({ TableName: 'yamada_invitations', Item: { ...inv, id } })
  );
}

export async function createApiKey(key: NewApiKey) {
  const timestamp = new Date().toISOString();
  await ddb.send(
    new PutCommand({ TableName: 'yamada_ssh_keys', Item: { ...key, timestamp } })
  );
}

export async function deleteApiKey(key: string) {
  await ddb.send(
    new DeleteCommand({ TableName: 'yamada_ssh_keys', Key: { key } })
  );
}

export async function getApiKeys(userId: number): Promise<ApiKey[]> {
  const res = await ddb.send(
    new ScanCommand({
      TableName: 'yamada_ssh_keys',
      FilterExpression: 'userId = :u',
      ExpressionAttributeValues: { ':u': userId }
    })
  );
  return (res.Items as ApiKey[]) || [];
}

export async function findUserTeam(userId: number) {
  const res = await ddb.send(
    new ScanCommand({
      TableName: 'yamada_team_members',
      FilterExpression: 'userId = :u',
      ExpressionAttributeValues: { ':u': userId }
    })
  );
  return res.Items?.[0] as TeamMember | undefined;
}

export async function updateTeam(id: number, data: Partial<Team>) {
  const expressions: string[] = [];
  const values: Record<string, any> = {};
  const names: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) {
    expressions.push(`#${k} = :${k}`);
    values[`:${k}`] = v;
    names[`#${k}`] = k;
  }
  if (expressions.length === 0) return;
  await ddb.send(
    new UpdateCommand({
      TableName: 'yamada_teams',
      Key: { id },
      UpdateExpression: 'set ' + expressions.join(', '),
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values
    })
  );
}

export async function getActivityLogsForUser(userId: number): Promise<ActivityLog[]> {
  const res = await ddb.send(
    new ScanCommand({
      TableName: 'yamada_activity_logs',
      FilterExpression: 'userId = :u',
      ExpressionAttributeValues: { ':u': userId }
    })
  );
  return (res.Items as ActivityLog[]) || [];
}

export async function getTeamByStripeCustomerId(customerId: string): Promise<Team | null> {
  const res = await ddb.send(
    new ScanCommand({
      TableName: 'yamada_teams',
      FilterExpression: 'stripeCustomerId = :c',
      ExpressionAttributeValues: { ':c': customerId }
    })
  );
  const item = res.Items?.[0] as Team | undefined;
  return item ? (itemToNumber(item) as Team) : null;
}

export async function updateTeamSubscription(teamId: number, data: Partial<Team>) {
  await updateTeam(teamId, data);
}

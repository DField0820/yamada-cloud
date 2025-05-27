import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';
import { ddb } from './dynamo';
import {
  GetCommand,
  ScanCommand
} from '@aws-sdk/lib-dynamodb';
import type {
  TeamDataWithMembers,
  TeamMember,
  User,
  Team,
  ApiKey
} from './schema';
import * as service from './dynamo-service';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  return await service.findUserById(sessionData.user.id);
}

export const getTeamByStripeCustomerId = service.getTeamByStripeCustomerId;
export const updateTeamSubscription = service.updateTeamSubscription;

export async function getUserWithTeam(userId: number) {
  const user = await service.findUserById(userId);
  const member = await service.findUserTeam(userId);
  return { user, teamId: member?.teamId };
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }
  return service.getActivityLogsForUser(user.id);
}

export async function getTeamForUser(): Promise<TeamDataWithMembers | null> {
  const user = await getUser();
  if (!user) return null;
  const member = await service.findUserTeam(user.id);
  if (!member) return null;
  const teamRes = await ddb.send(
    new GetCommand({ TableName: 'teams', Key: { id: member.teamId } })
  );
  const team = teamRes.Item as Team | undefined;
  if (!team) return null;
  const tmRes = await ddb.send(
    new ScanCommand({
      TableName: 'team_members',
      FilterExpression: 'teamId = :t',
      ExpressionAttributeValues: { ':t': member.teamId }
    })
  );
  const members = (tmRes.Items as TeamMember[]) || [];
  const users = await Promise.all(
    members.map(m =>
      ddb.send(new GetCommand({ TableName: 'users', Key: { id: m.userId } }))
    )
  );
  const withUsers = members.map((m, i) => ({
    ...m,
    user: ((users[i].Item || {}) as User) && {
      id: Number((users[i].Item as any).id),
      name: (users[i].Item as any).name,
      email: (users[i].Item as any).email
    }
  }));
  return { ...(team as Team), teamMembers: withUsers } as TeamDataWithMembers;
}

export async function getApiKeysForUser() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }
  return service.getApiKeys(user.id);
}

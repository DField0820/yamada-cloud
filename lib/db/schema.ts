export interface User {
  id: number;
  name?: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export type NewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export interface Team {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeProductId?: string | null;
  planName?: string | null;
  subscriptionStatus?: string | null;
}

export type NewTeam = Omit<Team, 'id' | 'createdAt' | 'updatedAt'>;

export interface TeamMember {
  id: number;
  userId: number;
  teamId: number;
  role: string;
  joinedAt?: string;
}

export type NewTeamMember = Omit<TeamMember, 'id' | 'joinedAt'>;

export interface ActivityLog {
  id: number;
  teamId: number;
  userId?: number | null;
  action: string;
  timestamp: string;
  ipAddress?: string | null;
}

export type NewActivityLog = Omit<ActivityLog, 'id' | 'timestamp'> & {
  timestamp?: string | Date;
};

export interface Invitation {
  id: number;
  teamId: number;
  email: string;
  role: string;
  invitedBy: number;
  invitedAt: string;
  status: string;
}

export type NewInvitation = Omit<Invitation, 'id' | 'invitedAt' | 'status'> & {
  status?: string;
};

export interface ApiKey {
  key: string;
  userId: number;
  name?: string | null;
  timestamp: string;
}

export type NewApiKey = Omit<ApiKey, 'timestamp'>;

export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION'
}

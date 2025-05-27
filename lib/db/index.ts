import * as dynamoService from './dynamo-service';
import * as dynamoQueries from './dynamo-queries';

export const DB_PROVIDER = 'dynamo';

export * from './schema';

const svc = dynamoService;
const queries = dynamoQueries;

export const {
  createUser,
  findUserByEmail,
  findUserById,
  createTeam,
  getTeamById,
  createTeamMember,
  findInvitation,
  updateInvitationStatus,
  logActivity,
  updateUserPassword,
  updateUser,
  markUserDeleted,
  removeTeamMember,
  findExistingMember,
  findExistingInvitation,
  createInvitation,
  createApiKey,
  deleteApiKey,
  getApiKeys,
  findUserTeam,
  updateTeam,
  getActivityLogsForUser,
  getTeamByStripeCustomerId,
  updateTeamSubscription
} = svc;

export const {
  getUser,
  getUserWithTeam,
  getActivityLogs,
  getTeamForUser,
  getApiKeysForUser
} = queries;

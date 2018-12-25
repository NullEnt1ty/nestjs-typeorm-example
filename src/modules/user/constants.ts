// Prefix the token with an underscore because Nest uses the token
// "UserRepository" for the TypeORM repository already. Need to find a better
// solution.
export const USER_REPOSITORY = '_UserRepository';
export const USER_SERVICE = 'UserService';

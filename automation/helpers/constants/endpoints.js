const ENDPOINTS = {
  auth: {
    login: process.env.API_LOGIN_PATH || '/auth/login',
    myInstitutesRoles:
      process.env.API_MY_INSTITUTES_ROLES_PATH || '/auth/my-institutes-roles',
  },
  users: process.env.API_USERS_PATH,
  institutes: process.env.API_INSTITUTES_PATH,
  roles: process.env.API_ROLES_PATH,
  mappings: process.env.API_MAPPINGS_PATH,
};

module.exports = ENDPOINTS;

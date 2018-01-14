export const apiRoutes = {
  authentication: '/token',
  authorization: '/Authorization',
  get_dashboard: '/api/Dashboard/Get/',
  post_dashboard: '/api/Dashboard/Post/',
  put_dashboard: '/api/Dashboard/Put/',
  delete_dashboard: '/api/Dashboard/Delete/',
  put_changePassword: '/users/change-password?',
  put_forgetPassword: '/users/forgot-password?',
  put_forgetUsername: '/users/forgot-username?'
};

export const externalApiRoutes = {
  geocode: 'geocode/json'
};

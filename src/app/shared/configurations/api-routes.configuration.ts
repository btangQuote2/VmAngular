export const apiRoutes = {
  authentication: '/token',
  authorization: '/Authorization',
  get_dashboard: '/api/Dashboard/Get/',
  post_dashboard: '/api/Dashboard/Post/',
  put_dashboard: '/api/Dashboard/Put/',
  delete_dashboard: '/api/Dashboard/Delete/',
  put_changePassword: '/users/change-password?',
  put_forgetPassword: '/users/forgot-password?',
  put_forgetUsername: '/users/forgot-username?',
  post_firstTimeLogin: '/users/firsttime-login?',
  get_securityQuestion: '/users/security-question/',
  put_securityQuestion: '/users/security-question-validate/',
  post_securityQuestion: '/users/security-question/',
  get_calenders: '/calendars/',
  get_documentsSearch: '/documents/search/',
  get_interviewSearch: '/interviews/search/',
  get_notificationSearch: '/notifications/search/'
};

export const externalApiRoutes = {
  geocode: 'geocode/json'
};

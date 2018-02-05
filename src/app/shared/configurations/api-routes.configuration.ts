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
  get_calenders: 'api/calendars/',
  get_documentsSearch: 'api/documents/search/',
  get_interviewSearch: 'api/interviews/search/',
  get_notificationSearch: '/api/notifications/search/',
  get_assignmentSearch: '/api/assignments/search?',
  get_assignment: '/api/assignments/',
  delete_assignment: '/api/assignments/',
  post_assignment: '/api/assignments/',
  get_languages: '/api/languages?',
  get_setting: '/api/users/setting',
  get_utilities: '/api/utilities/search',
  get_todohire: '/api/jobs/todo-hire',
  get_todomanage: 'api/jobs/todo-manage',
  get_jobsearch: '/api/jobs/search?',
  get_job: '/api/jobs/'

};

export const externalApiRoutes = {
  geocode: 'geocode/json'
};

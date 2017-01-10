(function() {
  'use strict';
  angular.module('adminApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngMessages',
    'app-templates',
    'ngCookies',
    'ngLodash',
    'ngToast',
    'ngFileUpload'])
  .run(function($rootScope, $state, Auth, $cookieStore, ngToast) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $rootScope.previousState = fromState;
      if (!!toState.data.access && !Auth.isAuthenticated()) {
        event.preventDefault();
        Auth.logout();
      } else {
        if (!!toState.data.access && !!toState.data.moduleRequired) {
          var modulePermission = Auth.hasModulePermission(toState.data.moduleRequired);
          if (!modulePermission) {
            event.preventDefault();
            ngToast.create({ className: 'danger', content: 'Forbidden module' });
          } else if (!!toState.data.action) {
            if (!modulePermission[toState.data.action]) {
              event.preventDefault();
              ngToast.create({ className: 'danger', content: 'Forbidden module' });
            }
          }
        }
      }
    });
  });
})();

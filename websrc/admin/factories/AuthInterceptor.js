(function() {
  'use strict';

  angular.module('adminApp').factory('AuthInterceptor', authInterceptor);
  authInterceptor.$inject = ['$q', '$injector', '$cookieStore'];

  function authInterceptor ($q, $injector, $cookieStore) {
    return {
      request: function(config) {
        var access_token = $cookieStore.get('auth_token') || null;
        //if ($cookieStore.get('auth_token')) access_token = angular.fromJson($cookieStore.get('auth_token')).data.access_token;
        if (access_token) config.headers.Authorization = 'Bearer ' + access_token;
        return config;
      },
      responseError: function(rejection) {
        var authService = $injector.get('Auth'),
            state = $injector.get('$state'),
            http = $injector.get('$http');

        switch (rejection.status) {
          case 401:
            return authService.tryToRefreshToken().then(function() {
              return http(rejection.config);
            }).catch(function() {
              authService.logout();
            });
            break;
          case 403:
            authService.logout();
            break;
        }

        return $q.reject(rejection);
      }
    }
  }
  angular.module('adminApp').config(function($httpProvider) { $httpProvider.interceptors.push('AuthInterceptor'); });
})();

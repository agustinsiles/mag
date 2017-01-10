(function() {
  'use strict';

  angular.module('app').factory('AuthInterceptor', authInterceptor);
  authInterceptor.$inject = ['$q', '$injector', '$cookieStore'];

  function authInterceptor ($q, $injector, $cookieStore) {
    return {
      request: function(config) {
        var token;
        if ($cookieStore.get('auth_token')) {
          token = angular.fromJson($cookieStore.get('auth_token')).token;
        }
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          $cookieStore.remove('auth_token');
          $injector.get('$state').go('anon.login');
        }
        return $q.reject(response);
      }
    }
  }

  angular.module('app').config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
})();

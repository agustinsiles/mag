(function() {
  'use strict';

  angular.module('app').factory('Auth', authService);
  authService.$inject = ['$http', 'AccessLevels', '$state', '$cookieStore'];

  function authService ($http, AccessLevels, $state, $cookieStore) {
    return {
      authorize: function(access) {
        if (access === AccessLevels.user) {
          return this.isAuthenticated();
        } else {
          return true;
        }
      },
      isAuthenticated: function() {
        return $cookieStore.get('auth_token');
      },
      login: function(credentials) {
        var login = $http.post('/login', credentials);
        login.success(function(result) {
          $cookieStore.put('auth_token', JSON.stringify(result));
        });
        return login;
      },
      logout: function() {
        $cookieStore.remove('auth_token');
        $state.go('anon.home');
      },
      register: function(formData) {
        $cookieStore.remove('auth_token');
        var register = $http.post('/signup', formData);
        register.success(function(result) {
          $cookieStore.put('auth_token', JSON.stringify(result));
        });
        return register;
      }
    }
  }
})();

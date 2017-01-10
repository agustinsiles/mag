(function() {
  'use strict';

  angular.module('adminApp').factory('Auth', authService);
  authService.$inject = ['$http', '$state', '$cookieStore', '$q', 'lodash', '$interval'];

  function authService($http, $state, $cookieStore, $q, _, $interval) {
    var checkUserStatus;

    function checkAuth() {
      /*
      $http.get('/admin/isAuthenticated').then(function(response) {
        if (!response.data.isAuthenticated) logout();
      }).catch(function(err) {
        logout();
      });*/
    };

    function login(credentials) {
      var deferred = $q.defer();
      $http.post('/admin/login', credentials).then(function(response) {
        $cookieStore.put('access_token', response.data.access_token);
        $cookieStore.put('refresh_token', response.data.refresh_token);
        $cookieStore.put('user', response.data.user);
        checkUserStatus = $interval(checkAuth, 10000);
        deferred.resolve(response);
      }).catch(function(err) {
        logout();
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function logout() {
      $cookieStore.remove('access_token');
      $cookieStore.remove('refresh_token');
      $cookieStore.remove('user');
      $interval.cancel(checkUserStatus);
      $state.go('anon.home');
    }

    function signup(formData) {
      var deferred = $q.defer()
      $http.post('/users/create', formData).success(function(response) {
        $cookieStore.put('access_token', response.data.access_token);
        $cookieStore.put('refresh_token', response.data.refresh_token);
        $cookieStore.put('user', response.data.user);
        deferred.resolve(response);
      }).catch(function(err) {
        logout();
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function refreshOwnUser(user) {
      var deferred = $q.defer();
      $http.post('/admin/refreshOwnUser', user).then(function(response) {
        $cookieStore.put('access_token', response.data.access_token);
        $cookieStore.put('user', response.data.user);
        deferred.resolve(response);
      }).catch(function(err) {
        logout();
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function refreshAccessToken() {
      var deferred = $q.defer(),
          refresh_token = $cookieStore.get('refresh_token');

      if (refresh_token) {
        $http({ method: 'PUT', url: '/admin/auth',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
            'refresh_token': refresh_token
          }
        }).success(function(response) {
          if (!response.isExpired) deferred.resolve(response);
          if (!!response.isExpired) deferred.reject(response);
        }).error(function(err) {
          console.log(err);
        });
      }

      if (!refresh_token) reject({});

      return deferred.promise;
    }

    function tryToRefreshToken() {
      var access_token = null;
      return refreshAccessToken().then(function(response) {
        if (!response.isExpired) access_token = response.access_token;
        if (response.isExpired) return $q.reject(response);
        $cookieStore.put('access_token', access_token);
        return response;
      }).catch(function(err) {
        return $q.reject(err);
      });
    }

    function isAuthenticated() {
      return $cookieStore.get('user');
    }

    function getCurrentUser() {
      return $cookieStore.get('user') || {};
    }

    function hasModulePermission(mod) {
      return _.find(getCurrentUser().permissions, function(p) { return p.module === mod; });
    }

    function getModules() {
      return ['category', 'product', 'user'];
    }

    return {
      hasModulePermission: hasModulePermission,
      tryToRefreshToken: tryToRefreshToken,
      isAuthenticated: isAuthenticated,
      getCurrentUser: getCurrentUser,
      getModules: getModules,
      refreshOwnUser: refreshOwnUser,
      login: login,
      logout: logout,
      signup: signup
    }
  }
})();

(function() {
  'use strict';

  angular.module('adminApp').factory('UsersService', UsersService);
  UsersService.$inject = ['$q', '$http'];

  function UsersService($q, $http) {

    function getAll() {
      var deferred = $q.defer(), url = '/users';
      $http.get(url).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function create(user) {
      var deferred = $q.defer(), url = '/users/add';
      $http.post(url, user).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function update(user) {
      var deferred = $q.defer(), url = '/users/edit';
      $http.put(url, user).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function remove(user) {
      var deferred = $q.defer(), url = '/users/' + user;
      $http.delete(url).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function changePassword(user) {
      var deferred = $q.defer(), url = '/users/chpwd';
      $http.put(url, user).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    return {
      getAll: getAll,
      create: create,
      update: update,
      remove: remove,
      changePassword: changePassword
    };
  }
})();

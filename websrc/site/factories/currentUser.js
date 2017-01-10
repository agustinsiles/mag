(function() {
  'use strict';

  angular.module('app').factory('CurrentUser', currentUser);
  currentUser.$inject = ['$cookieStore'];

  function currentUser ($cookieStore) {
    return {
      user: function () {
        if ($cookieStore.get('auth_token')) {
          return angular.fromJson($cookieStore.get('auth_token')).user;
        } else {
          return {};
        }
      }
    };
  }
})();

(function() {
  'use strict';

  angular.module('adminApp').controller('NavController', navController);
  navController.$inject = ['Auth'];

  function navController(Auth) {
    this.isCollapsed = true;
    this.auth = Auth;
    this.user = Auth.getCurrentUser().email;

    this.logout = function() {
      Auth.logout();
    };
  }

})();

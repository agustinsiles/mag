(function() {
  'use strict';

  angular.module('adminApp').controller('LoginController', loginController);
  loginController.$inject = ['$state', 'Auth', 'ngToast'];

  function loginController ($state, Auth, ngToast) {
    var self = this;
    this.user = {};

    this.login = function login() {
      Auth.login(self.user).then(function(result) {
        $state.go('products');
      }).catch(function() {
        ngToast.create({ className: 'danger', content: 'Invalid credentials' });
      });
    }
  }
})();

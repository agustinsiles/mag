(function() {
  'use strict';

  angular.module('app').controller('LoginController', loginController);
  loginController.$inject = ['$state', 'Auth'];

  function loginController ($state, Auth) {
    var self = this;
    this.user = {};

    this.login = function login () {
      self.errors = [];

      Auth.login(self.user).then(function(result) {
        $state.go('products');
      }).catch(function(err) {
        self.errors.push(err);
      });
    }
  }

})();

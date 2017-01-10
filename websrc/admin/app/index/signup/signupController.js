(function() {
  'use strict';

  angular.module('adminApp').controller('SignUpController', SignUpController);
  SignUpController.$inject = ['$state', 'Auth', '$scope'];

  function SignUpController($state, Auth, $scope) {
    $scope.signup = function() {
      Auth.signup($scope.user).then(function() {
        $state.go('products');
      });
    }
  }
})();

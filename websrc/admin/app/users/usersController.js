(function() {
  'use strict';

  angular.module('adminApp').controller('UsersController', usersController);
  usersController.$inject = [
    'UsersService',
    '$scope',
    '$state',
    'lodash',
    '$uibModal',
    'confirmDialog',
    'ngToast',
    'Auth'
  ];

  function usersController(
    UsersService,
    $scope,
    $state,
    _,
    $uibModal,
    confirmDialog,
    ngToast,
    Auth) {

    var self = this;
    this.auth = Auth;

    function stateHandler() {
      if ($state.$current.toString() === 'users.add') {
        self.openModal(null);
      } else if (!!$state.params.id && $state.$current.toString() === 'users.edit') {
        var user = _.find(self.users, function(u) { return u.id === $state.params.id });
        if (!user) $state.go('users');
        if (!!user) self.openModal(user);
      }
    }

    function getData() {
      UsersService.getAll().then(function(response) {
        self.users = response;
        stateHandler();
      });
    }

    this.openModal = function(user, isPasswordChange) {
      var url = isPasswordChange ? 'app/users/form/changePassword.html' : 'app/users/form/addEditUser.html',
          modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            controller: 'UsersCrudController',
            controllerAs: 'ctrl',
            templateUrl: url,
            size: 'lg',
            resolve: {
              user: function() { return user; }
            }
          });

      modalInstance.result.then(function(response) {
        self.users = response;
      });
    };

    function removeUser(user) {
      var buttons = [],
          text = 'Are you sure you wanna remove ' + user.name + '?',
          deleteUserOptions = { text: text, buttons: buttons };

      buttons.push({
        text: 'Yes',
        styles: 'btn btn-active pull-left',
        action: function() {
          UsersService.remove(user).then(function(response) {
            self.users = response;
            ngToast.create({ className: 'success', content: 'User successfully deleted!' });
          }).catch(function(err) {
            ngToast.create({ className: 'danger', content: err.message });
          }).finally(function() { $scope.deleteModal.dismiss('cancel'); });
        }
      }, {
        text: 'No',
        styles: 'btn pull-right',
        action: function() {
          $scope.deleteModal.dismiss('cancel');
        }
      });
      $scope.deleteModal = confirmDialog.showConfirmDialog(deleteUserOptions, user);
    }

    getData();
  }

})();

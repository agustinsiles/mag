(function() {
  'use strict';

  angular.module('adminApp').controller('UsersCrudController', usersCrudController);
  usersCrudController.$inject = [
    '$uibModalInstance',
    'lodash',
    '$state',
    '$rootScope',
    '$scope',
    'ngToast',
    'user',
    'Auth',
    'UsersService',
    '$q'];

  function usersCrudController(
    $uibModalInstance,
    _,
    $state,
    $rootScope,
    $scope,
    ngToast,
    user,
    Auth,
    UsersService,
    $q) {

    var self = this,
        isOwnUser = !!user && Auth.getCurrentUser().id === user.id;
    this.disabled = false;
    this.isEditing = !!user;
    this.user = !!user ? _.cloneDeep(user) : { permissions: [] };
    this.modules = [];
    _.forEach(Auth.getModules(), function(m, i) {
      self.modules.push({ name: m, disabled: false });
    });

    this.addPermission = function() {
      var firstAvailableModule = _.find(self.modules, function(m) { return !m.disabled; });
      self.user.permissions.push({ module: firstAvailableModule.name });
      self.setAvailableModules();
    };

    this.removePermission = function(permission) {
      self.user.permissions.splice(permission, 1);
      self.setAvailableModules();
    };

    this.setAvailableModules = function() {
      var assignedPermissions = [];

      _.forEach(self.user.permissions, function(p) {
        assignedPermissions.push(p.module)
      });

      _.forEach(self.modules, function(m, x) {
        self.modules[x].disabled = assignedPermissions.indexOf(m.name) >= 0;
      });
    };

    this.changePassword = function() {
      self.disabled = true;
      UsersService.changePassword(self.user).then(function(users) {
        ngToast.create({ className: 'success', content: 'Password successfully changed.' });
        self.closeModal(users);
      }).finally(function() {
        self.disabled = false;
      });
    };

    function refreshOwnUser() {
      var deferred = $q.defer();
      if (isOwnUser) Auth.refreshOwnUser(self.user).then(deferred.resolve).catch(deferred.reject);
      if (!isOwnUser) deferred.resolve(true);
      return deferred.promise;
    }

    this.addEditUser = function() {
      self.disabled = true;
      var action = !user ? 'create' : 'update';
      UsersService[action](self.user).then(function(users) {
        refreshOwnUser().then(function() {
          self.closeModal(users);
        }).catch(self.closeModal);
      }).catch(self.closeModal);
    };

    this.closeModal = function(response) {
      var nextState = $rootScope.previousState.name || $state.$current.parent.toString(),
          reloadState = !$rootScope.previousState.name === $state.$current.parent.toString();

      if (!response) $uibModalInstance.dismiss('cancel');
      if (!!response) $uibModalInstance.close(response);

      $state.go(nextState, {}, { reload: reloadState });
    };

    self.setAvailableModules();
  }
})();

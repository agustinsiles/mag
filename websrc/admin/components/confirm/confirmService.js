(function() {
  'use strict';

  angular.module('adminApp').factory('confirmDialog', confirmDialog);
  confirmDialog.$inject = ['$uibModal'];

  function confirmDialog($uibModal) {
    var showConfirmDialog = function(options, item) {
      var modalInstance = $uibModal.open({
        templateUrl: 'components/confirm/confirmDialog.html',
        controller: 'confirmDialogCtrl as ctrl',
        size: 'sm',
        resolve: {
          item: function() {
            return item
          },
          options: function() {
            return options;
          }
        }
      });
      return modalInstance;
    }

    return {
      showConfirmDialog: showConfirmDialog
    }
  }

  //Controller
  angular.module('adminApp').controller('confirmDialogCtrl', confirmDialogCtrl);
  confirmDialogCtrl.$inject = ['options', 'item'];

  function confirmDialogCtrl(options, item) {
    this.item = item;
    this.options = options;
  }
})();

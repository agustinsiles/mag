(function() {
  'use strict';

  angular.module('app').controller('ProductDetailController', productDetailController);
  productDetailController.$inject = ['ProductsService', '$scope', '$stateParams', 'lodash', '$q'];

  function productDetailController(ProductsService, $scope, $stateParams, _, $q) {
    var self = this;

    if ($stateParams.prodId) {
      ProductsService.getProductById($stateParams.prodId).then(function(response) {
        self.currentProduct = response[0];
      });
    }
  }
})();

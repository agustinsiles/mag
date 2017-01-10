(function() {
  'use strict';

  angular.module('app').controller('ProductsResultsController', productsResultsController);
  productsResultsController.$inject = ['ProductsService', '$scope', '$state', 'lodash', '$q', '$stateParams'];

  function productsResultsController(ProductsService, $scope, $state, _, $q, $stateParams) {
    var self = this;
    self.productsList = [];

    function getProducts() {
      var defer = $q.defer();

      ProductsService.getAllProducts().then(function(response) {
        self.products = response;
        defer.resolve();
      });

      return defer.promise;
    }

    if ($stateParams.catId) {
      getProducts().then(function() {
        _.each(self.products, function(prod) {
          if (prod.category.id === $stateParams.catId) {
            self.productsList.push(prod);
          }
        });
      });
    }

  }
})();

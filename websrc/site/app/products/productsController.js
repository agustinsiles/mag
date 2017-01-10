(function() {
  'use strict';

  angular.module('app').controller('ProductsController', productsController);
  productsController.$inject = ['ProductsService', '$scope', '$state', 'lodash', '$q'];

  function productsController(ProductsService, $scope, $state, _, $q) {
    var self = this;

    /**
     * Get all contacts
     */
    function getCategories() {
      var defer = $q.defer();

      ProductsService.getAllCategories().then(function(response) {
        //Iterate categories and add each subcategorie to its parent category object
        var x;
        for (x = 0; x < response.length; x++) {
          if (response[x].parentCategory) {
            var parent = _.find(response, function(c) { return c.id === response[x].parentCategory.id; });
            parent.subCategories = !(parent.subCategories && parent.subCategories.length) ? [] : parent.subCategories;
            parent.subCategories.push(response[x]);
          }
        }
        //Remove subcategories from category list, they already are in its parent category object
        _.remove(response, function(r) { return r.parentCategory; });
        self.categoryList = response;
        defer.resolve();
      });

      return defer.promise;
    }

    getCategories().then(function() {
      if ($state.$current.toString() === 'products' && self.categoryList.length) {
        $state.go('products.results', {
          catId: self.categoryList[0].id
        });
      }
    });
  }
})();

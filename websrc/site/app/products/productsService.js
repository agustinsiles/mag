(function() {
  'use strict';

  angular.module('app').factory('ProductsService', ProductsService);
  ProductsService.$inject = ['$q', '$http'];

  function ProductsService($q, $http) {

    function getAllProducts() {
      var deferred = $q.defer(),
          url = '/products';

      $http.get(url).success(function(response) {
        deferred.resolve(response);
      }).error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getProductById(id) {
      var deferred = $q.defer(),
          url = '/product';

      $http.get(url, {params: {id: id}}).success(function(response) {
        deferred.resolve(response);
      }).error(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function createProduct() {
      var deferred = $q.defer(),
          url = '/product/add';

      $http.post(url, product).success(function(response) {
        deferred.resolve(response);
      }).error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function removeProduct() {
      var deferred = $q.defer(),
          url = '/product/' + productId;

      $http.delete(url).success(function(response) {
        deferred.resolve(response);
      }).error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getAllCategories() {
      var deferred = $q.defer(),
          url = '/categories';

      $http.get(url).success(function(response) {
        deferred.resolve(response);
      }).error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function createCategory(category) {
      var deferred = $q.defer(),
          url = '/category/add';

      $http.post(url, category).success(function(response) {
        deferred.resolve(response);
      }).error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function updateCategory(category) {
      var deferred = $q.defer(),
          url = '/category/edit';

      $http.put(url, category).success(function(response) {
        deferred.resolve(response);
      }).error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function removeCategory(categoryId) {
      var deferred = $q.defer(),
          url = '/category/' + categoryId;

      $http.delete(url).success(function(response) {
        deferred.resolve(response);
      }).error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    return {
      getAllProducts: getAllProducts,
      createProduct: createProduct,
      removeProduct: removeProduct,
      getAllCategories: getAllCategories,
      createCategory: createCategory,
      updateCategory: updateCategory,
      removeCategory: removeCategory,
      getProductById: getProductById
    };
  }
})();

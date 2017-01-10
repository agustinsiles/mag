(function() {
  'use strict';

  angular.module('adminApp').factory('ProductsService', ProductsService);
  ProductsService.$inject = ['$q', '$http'];

  function ProductsService($q, $http) {

    function getAllProducts() {
      var deferred = $q.defer(), url = '/products';
      $http.get(url).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function updateProduct(product) {
      var deferred = $q.defer(), url = '/product/edit';
      $http.put(url, product).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function createProduct(product) {
      var deferred = $q.defer(), url = '/product/add';
      $http.post(url, product).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function removeProduct(product) {
      var deferred = $q.defer(), url = '/product/' + product;
      $http.delete(url).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function getAllCategories() {
      var deferred = $q.defer(), url = '/categories';
      $http.get(url).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function createCategory(category) {
      var deferred = $q.defer(), url = '/category/add';
      $http.post(url, category).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function updateCategory(category) {
      var deferred = $q.defer(), url = '/category/edit';
      $http.put(url, category).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function removeCategory(category) {
      var deferred = $q.defer(), url = '/category/' + category.id;
      $http.delete(url, { params: category }).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    return {
      getAllProducts: getAllProducts,
      createProduct: createProduct,
      updateProduct: updateProduct,
      removeProduct: removeProduct,
      getAllCategories: getAllCategories,
      createCategory: createCategory,
      updateCategory: updateCategory,
      removeCategory: removeCategory
    };
  }
})();

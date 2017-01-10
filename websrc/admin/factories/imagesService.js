(function() {
  'use strict';

  angular.module('adminApp').factory('ImagesService', ImagesService);
  ImagesService.$inject = ['$q', '$http', 'Upload'];

  function ImagesService($q, $http, Upload) {

    function uploadImages(files) {
      var deferred = $q.defer(), url = '/file/upload';

      Upload.upload({ url: url, arrayKey: '', file: files, data: { path: 'products/' + files[0].product + '/' } }).then(function(response) {
        createImages(files).then(deferred.resolve);
      }).catch(deferred.reject);

      return deferred.promise;
    }

    function createImages(image) {
      var deferred = $q.defer(), url = '/image/add';
      $http.post(url, image).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function updateImages(images) {
      var deferred = $q.defer(), url = '/image/edit';
      if (!!images.length) $http.put(url, images).success(deferred.resolve).error(deferred.reject);
      if (!images.length) deferred.resolve(true);
      return deferred.promise;
    }

    function deleteImages(images) {
      var deferred = $q.defer(), url = '/image/delete';
      if (!!images.length) $http.delete(url, { data: { images: images } }).success(deferred.resolve).error(deferred.reject);
      if (!images.length) deferred.resolve(true);
      return deferred.promise;
    }

    function deleteByProduct(product) {
      var deferred = $q.defer(), url = '/image/product/' + product;
      $http.delete(url).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function getAllMain() {
      var deferred = $q.defer(), url = '/image/main';
      $http.get(url).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    function getByProduct(productId) {
      var deferred = $q.defer(), url = '/images/' + productId;
      $http.get(url).success(deferred.resolve).error(deferred.reject);
      return deferred.promise;
    }

    return {
      uploadImages: uploadImages,
      updateImages: updateImages,
      deleteImages: deleteImages,
      deleteByProduct: deleteByProduct,
      getAllMain: getAllMain,
      getByProduct: getByProduct
    };
  }
})();

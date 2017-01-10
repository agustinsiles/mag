(function() {
  'use strict';

  angular.module('adminApp').controller('ProductsCrudController', productsCrudController);
  productsCrudController.$inject = [
    'ProductsService',
    'ImagesService',
    '$uibModalInstance',
    'lodash',
    'product',
    'category',
    'categories',
    '$state',
    '$rootScope',
    '$scope',
    '$q',
    'ngToast'];

  function productsCrudController(
    ProductsService,
    ImagesService,
    $uibModalInstance,
    _,
    product,
    category,
    categories,
    $state,
    $rootScope,
    $scope,
    $q,
    ngToast) {

    var self = this, imgToDelete = [], isEditing = category || product;
    this.disabled = false;
    this.product = {};
    this.categories = _.cloneDeep(categories);
    this.filesToUpload = [];

    if (!!category) {
      self.category = _.clone(category);
      _.remove(self.categories, function(c) { return c.id === category.id });
      _.remove(self.categories, function(c) {
        return _.find(c.ancestors, function(a) { return a.id === category.id });
      });
   } else if (!!product) {
     self.product = _.clone(product);
     self.path = '../uploads/';
     ImagesService.getByProduct(product.id).then(function(images) {
       self.product.mainImage = _.find(images, function(i) { return i.isMain; });
       self.product.productImages = images;
     });
   }

    $scope.$watch('files', function(nv, ov) {
      if (!!nv && nv !== ov) self.filesToUpload = _.union(self.filesToUpload, nv);
      if (!!nv && nv !== ov && !self.product.mainImage) self.product.mainImage = self.filesToUpload[0];
    });

    function uploadImages(products) {
      var deferred = $q.defer();

      if (!!self.filesToUpload.length) {
        for (var x = 0; x < self.filesToUpload.length; x++) {
          self.filesToUpload[x].isMain = self.filesToUpload[x] === self.product.mainImage;
          self.filesToUpload[x].product = isEditing ? product.id : products.product.id;
          self.filesToUpload[x].uri = 'products/' + self.filesToUpload[x].product + '/' + self.filesToUpload[x].name;
        }
        ImagesService.uploadImages(self.filesToUpload).then(deferred.resolve).catch(deferred.reject);
      }

      if (!self.filesToUpload.length) deferred.resolve(true);
      return deferred.promise;
    }

    function updateExistingImages() {
      var deferred = $q.defer();

      if (isEditing) {
        for (var x = 0; x < self.product.productImages.length; x++)
          self.product.productImages[x].isMain = self.product.productImages[x] === self.product.mainImage;
        ImagesService.updateImages(self.product.productImages).then(deferred.resolve).catch(deferred.reject);
      }

      if (!isEditing) deferred.resolve(true);
      return deferred.promise;
    }

    function deleteImages() {
      var deferred = $q.defer();
      if (!imgToDelete.length) deferred.resolve(true);
      if (!!imgToDelete.length) ImagesService.deleteImages(imgToDelete).then(deferred.resolve).catch(deferred.reject);
      return deferred.promise;
    }

    function errorHanlder(err) {
      ngToast.create({ className: 'danger', content: err.message });
    }

    this.removeImageFromList = function(img) {
      var isNew = !img.product;
      if (isNew) _.remove(self.filesToUpload, function(f) { return f === img; });
      if (!isNew) {
        _.remove(self.product.productImages, function(f) { return f === img; });
        imgToDelete.push(img.id);
      }
    };

    this.addEditProduct = function() {
      var action = isEditing ? 'updateProduct' : 'createProduct';
      self.disabled = true;

      ProductsService[action](self.product).then(function(products) {
        uploadImages(products).then(updateExistingImages).then(deleteImages).then(ImagesService.getAllMain).then(function(imgs) {
          self.closeModal([products.products, imgs]);
        }).catch(errorHanlder);
      }).catch(errorHanlder);
    };

    this.addEditCategory = function() {
      var action = isEditing ? 'updateCategory' : 'createCategory';
      self.disabled = true;
      ProductsService[action](self.category).then(self.closeModal).catch(errorHanlder);
    };

    this.closeModal = function(response) {
      var nextState = $rootScope.previousState.name || $state.$current.parent.toString(),
          reloadState = !$rootScope.previousState.name === $state.$current.parent.toString();

      if (!response) $uibModalInstance.dismiss('cancel');
      if (!!response) $uibModalInstance.close(response);

      $state.go(nextState, {}, { reload: reloadState });
    };
  }
})();

(function() {
  'use strict';

  angular.module('adminApp').controller('ProductsController', productsController);
  productsController.$inject = [
    'ProductsService',
    'ImagesService',
    '$scope',
    '$state',
    'lodash',
    '$q',
    '$uibModal',
    'confirmDialog',
    'ngToast',
    'Auth'
  ];

  function productsController(
    ProductsService,
    ImagesService,
    $scope,
    $state,
    _,
    $q,
    $uibModal,
    confirmDialog,
    ngToast,
    Auth
  ) {

    var self = this;
    this.Auth = Auth;

    function getData() {
      $q.all([
        ProductsService.getAllCategories(),
        ProductsService.getAllProducts(),
        ImagesService.getAllMain()
      ]).then(function(response) {
        self.categories = formatCategories(response[0]);
        self.products = formatProducts(response[1], response[2]);
        self.mainImages = response[2];
        stateHandler();
      });
    }

    function formatCategories(categories) {
      _.forEach(categories, function(c, i) {
        if (!!c.ancestors.length) {
          _.forEach(c.ancestors, function(a, x) {
            categories[i].ancestors[x] = _.find(categories, function(cat) { return cat.id === a; });
          });
        }
      });
      return categories;
    }

    function formatProducts(products, images) {
      _.forEach(products, function(p, x) {
        products[x].image = _.find(images, function(i) { return i.product === products[x].id; });
      });
      return products;
    }

    function stateHandler() {
      if ($state.$current.toString() === 'categories.add') {
        self.openModal(null, false);
      } else if ($state.$current.toString() === 'products.add') {
        self.openModal(null, true);
      } else if (!!$state.params.id && $state.$current.toString() === 'categories.edit') {
        var cat = _.find(self.categories, function(c) { return c.id === $state.params.id });
        if (!cat) $state.go('categories');
        if (!!cat) self.openModal(cat, false);
      } else if (!!$state.params.id && $state.$current.toString() === 'products.edit') {
        var prod = _.find(self.products, function(p) { return p.id === $state.params.id });
        if (!prod) $state.go('products');
        if (!!prod) self.openModal(prod, true);
      }
    }

    this.openModal = function(model, isProduct) {
      var product = isProduct ? model : null,
          category = !isProduct ? model : null,
          url = isProduct ? 'app/products/form/addEditProduct.html' : 'app/products/form/addEditCategory.html',

          modalInstance = $uibModal.open({
            animation: true,
            backdrop: 'static',
            controller: 'ProductsCrudController',
            controllerAs: 'ctrl',
            templateUrl: url,
            size: 'lg',
            resolve: {
              product: function() { return product; },
              category: function() { return category; },
              categories: function() { return self.categories; }
            }
          });

      modalInstance.result.then(function(response) {
        if (isProduct) self.products =  formatProducts(response[0], response[1]);
        if (!isProduct) self.categories = formatCategories(response);
      });
    };

    this.deleteProduct = function(product) {
      var buttons = [],
          text = 'Are you sure you wanna remove ' + product.name  + '?',
          deleteProductOptions = { text: text, buttons: buttons };

      buttons.push({
        text: 'Yes',
        styles: 'btn btn-active pull-left',
        action: function() {
          ProductsService.removeProduct(product.id).then(function(response) {
            ImagesService.deleteByProduct(product.id).then(function() {
              self.products = formatProducts(response.products, self.mainImages);
              ngToast.create({ className: 'success', content: 'Product successfully deleted!' });
            });
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
      $scope.deleteModal = confirmDialog.showConfirmDialog(deleteProductOptions, product);
    };

    this.deleteCategoryModal = function(category) {
      var associatedProducts = _.find(self.products, function(p) { return p.category && p.category.id === category.id; });
      category.hasChildren = _.some(self.categories, function(c) { return c.parentCategory && c.parentCategory.id === category.id });
      if (!associatedProducts) removeCategory(category);
      if (!!associatedProducts) ngToast.create({ className: 'danger', content: category.name + ' has associated products. It cant be removed' });
    };

    function removeCategory(category) {
      var buttons = [],
          text = !!category.hasChildren ? category.name + ' has subcategories. Are you sure you wanna remove it anyway?' :
                  'Are you sure you wanna remove ' + category.name + '?',
          deleteCategoryOptions = { text: text, buttons: buttons };

      buttons.push({
        text: 'Yes',
        styles: 'btn btn-active pull-left',
        action: function() {
          ProductsService.removeCategory(category).then(function(response) {
            self.categories = formatCategories(response);
            ngToast.create({ className: 'success', content: 'Category successfully deleted!' });
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
      $scope.deleteModal = confirmDialog.showConfirmDialog(deleteCategoryOptions, category);
    }
    getData();
  }
})();

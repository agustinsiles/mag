(function() {
  'use strict';

  angular.module('app').config(function($stateProvider, $urlRouterProvider, AccessLevels) {
    var route = '../site/';


    $stateProvider.state('home', {
      url: '/',
      templateUrl: route + 'app/index/index.html',
      data: {
        access: AccessLevels.anon
      }
    });
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: route + 'app/users/login.html',
      controller: 'LoginController as ctrl',
      data: {
        access: AccessLevels.anon
      }
    });

    $stateProvider.state('products', {
      url:'/products/',
      controller: 'ProductsController as ctrl',
      templateUrl: route + 'app/products/products.html',
      data: {
        access: AccessLevels.anon
      }
    });

    $stateProvider.state('products.results', {
      url: 'catalog/:catId',
      views: {
        '': {
          controller: 'ProductsResultsController as ctrl',
          templateUrl: route + 'app/products/productsResults.html'
        }
      },
      data: {
        access: AccessLevels.anon
      }
    });

    $stateProvider.state('products.details', {
      url: ':prodId',
      views: {
        '': {
          controller: 'ProductDetailController as ctrl',
          templateUrl: route + 'app/products/productDetail.html'
        }
      },
      data: {
        access: AccessLevels.anon
      }
    });


    $urlRouterProvider.otherwise('/');
  });
})();

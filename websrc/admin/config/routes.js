(function() {
  'use strict';

  angular.module('adminApp').config(function($stateProvider, $urlRouterProvider) {
    var route = '../admin/';

    // Anon user
    $stateProvider.state('anon', {
      abstract: true,
      template: '<ui-view/>',
      data: {
        access: false
      }
    });
    $stateProvider.state('anon.home', {
      url: '/',
      templateUrl: route + 'app/index/index.html'
    });
    $stateProvider.state('anon.login', {
      url: '/login',
      templateUrl: route + 'app/index/login/login.html',
      controller: 'LoginController as ctrl'
    });
    /*
    $stateProvider.state('anon.register', {
      url: '/register',
      templateUrl: route + 'app/index/signup/signup.html',
      controller: 'SignUpController'
    });
    */
    // User Permission
    $stateProvider.state('users', {
      url: '/users',
      templateUrl: route + 'app/users/users.html',
      controller: 'UsersController as ctrl',
      data: {
        access: true,
        moduleRequired: 'user'
      }
    });
    $stateProvider.state('users.add', {
      url: '/add',
      controller: 'UsersController as ctrl',
      data: {
        action: 'create'
      }
    });
    $stateProvider.state('users.edit', {
      url: '/edit/:id',
      controller: 'UsersController as ctrl',
      data: {
        action: 'update'
      }
    });

    // Products
    $stateProvider.state('products', {
      url: '/products',
      templateUrl: route + 'app/products/products.html',
      controller: 'ProductsController as ctrl',
      data: {
        access: true,
        moduleRequired: 'product'
      }
    });
    $stateProvider.state('products.add', {
      url: '/add',
      controller: 'ProductsController as ctrl',
      data: {
        action: 'create'
      }
    });
    $stateProvider.state('products.edit', {
      url: '/edit/:id',
      controller: 'ProductsController as ctrl',
      data: {
        action: 'update'
      }
    });

    // Categories
    $stateProvider.state('categories', {
      url: '/categories',
      templateUrl: route + 'app/products/categories.html',
      controller: 'ProductsController as ctrl',
      data: {
        access: true,
        moduleRequired: 'category'
      }
    });
    $stateProvider.state('categories.add', {
      url: '/add',
      controller: 'ProductsController as ctrl',
      data: {
        action: 'create'
      }
    });
    $stateProvider.state('categories.edit', {
      url: '/edit/:id',
      controller: 'ProductsController as ctrl',
      data: {
        action: 'update'
      }
    });

    $urlRouterProvider.otherwise('/');
  });
})();

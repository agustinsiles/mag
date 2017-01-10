module.exports.routes = {
  // Pages redirection
  '/': 'PageController.public',
  '/admin/': 'PageController.admin',

  //Authentication
  'POST /admin/login': 'AuthController.adminLogin',
  'POST /admin/refreshOwnUser': 'AuthController.refreshOwnUser',
  'GET /admin/isAuthenticated': 'AuthController.isAuthenticated',
  'PUT /admin/auth': 'AuthController.refreshAccessToken',
  'POST /site/login': 'AuthController.publicLogin',

  //Users
  'GET /users': 'UserController.getAll',
  'POST /users/add': 'UserController.create',
  'PUT /users/edit': 'UserController.update',
  'PUT /users/chpwd': 'UserController.changePassword',
  'DELETE /users/:id': 'UserController.remove',

  //Products
  'GET /products': 'ProductController.getAll',
  'GET /product': 'ProductController.getById',
  'POST /product/add': 'ProductController.create',
  'PUT /product/edit': 'ProductController.update',
  'DELETE /product/:id': 'ProductController.remove',

  //Categories
  'GET /categories': 'CategoryController.getAll',
  'POST /category/add': 'CategoryController.create',
  'PUT /category/edit': 'CategoryController.update',
  'DELETE /category/:id': 'CategoryController.remove',

  //Files
  'POST /file/upload': 'FileController.upload',

  //Images
  'GET /image/main': 'ImageController.getAllMain',
  'GET /images/:productId': 'ImageController.getByProduct',
  'POST /image/add': 'ImageController.create',
  'PUT /image/edit': 'ImageController.update',
  'DELETE /image/delete': 'ImageController.remove',
  'DELETE /image/product/:product': 'ImageController.removeByProduct'
};

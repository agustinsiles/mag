module.exports.policies = {

  'AuthController': {
    '*': false,
    'adminLogin': true,
    'refreshUser': ['tokenAdminAuth', 'ownUser'],
    'isAuthenticated': true,
    'refreshAccessToken': ['expiredAccess']
  },

  'UserController': {
    '*': false,
    'create': ['tokenAdminAuth', 'createUser'],
    'update': ['tokenAdminAuth', 'updateUser'],
    'remove': ['tokenAdminAuth', 'removeUser'],
    'getAll': ['tokenAdminAuth', 'getUsers'],
    'changePassword': ['tokenAdminAuth', 'ownUser']
  },

  'CategoryController': {
    '*': false,
    'create': ['tokenAdminAuth', 'createCategory'],
    'update': ['tokenAdminAuth', 'updateCategory'],
    'remove': ['tokenAdminAuth', 'removeCategory'],
    'getAll': true
  },

  'ProductController': {
    '*': false,
    'create': ['tokenAdminAuth', 'createProduct'],
    'update': ['tokenAdminAuth', 'updateProduct'],
    'remove': ['tokenAdminAuth', 'removeProduct'],
    'getAll': true,
    'getById': true
  }
};

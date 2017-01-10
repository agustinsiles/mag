/**
* Category.js
*
* @description :: Each category can have a parentCategory that would be another category, using the same model
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'MongoDB',
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    description: {
      type: 'string',
    },
    products: {
      collection: 'product',
      via: 'category'
    },
    parentCategory: {
      model: 'category',
      defaultsTo: null
    },
    ancestors: {
      type: 'array',
      defaultsTo: []
    }/*,
    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
    */
  }
};

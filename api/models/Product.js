/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'MongoDB',
  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: false
    },
    price: {
      type: 'integer',
      required: false
    },
    stock: {
      type: 'integer',
      required: false
    },
    category: {
      model: 'category'
    },
    images: {
      collection: 'image',
      via: 'product'
    }
  }/*,

  beforeUpdate: function(values, cb) {
    // If we are removing the association, the product is not useful anymore
    if (values.category === null) {
      console.log(this.id);
    }

    cb();
  }*/
};

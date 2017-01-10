var Promise = require('bluebird');

function getProducts() {
  return new Promise(function(resolve, reject) {
    Product.find({}).populate('category').then(resolve).catch(reject);
  });
}

module.exports = {
 	getAll: function(req, res) {
 		getProducts().then(function(response) {
 		  res.json(response);
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
 	},

  getById: function(req, res) {
    Product.find({ id: req.param('id') }).populate('category').then(function(product) {
      res.json(product);
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
 	},

 	create: function(req, res) {
    Product.create(req.allParams()).then(function(product) {
      getProducts().then(function(products) {
        res.json(200, { products: products, product: product });
      }).catch(function(err) {
        return res.json(err.status, { err: err });
      });
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
 	},

	 update: function (req, res) {
		 var product = req.allParams();
     Product.update(product.id, product).then(function() {
       getProducts().then(function(products) {
         res.json(200, { products: products });
       }).catch(function(err) {
         return res.json(err.status, { err: err });
       });
     }).catch(function(err) {
       return res.json(err.status, { err: err });
     });
	 },

 	remove: function(req, res) {
    Product.destroy(req.param('id')).then(function() {
      getProducts().then(function(products) {
        res.json(200, { products: products });
      }).catch(function(err) {
        return res.json(err.status, { err: err });
      });
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
 	},

 	_config: { actions: false, shortcuts: false, rest: false }
 };

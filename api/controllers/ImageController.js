var Promise = require('bluebird');

function getAllMain() {
  return new Promise(function(resolve, reject) {
    Image.find({ isMain: true }).then(resolve).catch(reject);
  });
}

module.exports = {
  getAllMain: function(req, res) {
    getAllMain().then(function(response) {
      res.json(response);
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
  },

  getByProduct: function(req, res) {
    Image.find({ product: req.param('productId') }).then(function(response) {
      res.json(response);
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
  },

  create: function(req, res) {
    Image.create(req.body).then(function() {
      getAllMain().then(function(response) {
        res.json(response);
      }).catch(function(err) {
        return res.json(err.status, { err: err });
      });
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
  },

  update: function(req, res) {
    var files = req.body, images = [];

    if (!files.length) return res.json(200, { images: {} });
    if (!!files.length) {
      for (var x = 0; x < files.length; x++) {
        (function(i) {
          Image.update(files[i].id, files[i]).then(function(image) {
            images.push(image);
            if (i === files.length - 1) res.json(images);
          }).catch(function(err) {
            return res.json(err.status, { err: err });
          });
        })(x);
      }
    }
  },

  remove: function(req, res) {
    var files = req.body.images;
    if (!!files.length) {
      Image.destroy(files).then(function(images) {
        FilesService.delete({ files: images }).then(function(response) {
          res.json(response);
        }).catch(function(err) {
          return res.json(err.status, { err: err });
        });
      }).catch(function(err) {
        return res.json(err.status, { err: err });
      });
    }
    if (!files.length) res.json(200, { images: {} });
  },

  removeByProduct: function(req, res) {
    var product = req.param('product');
    Image.destroy({ product: product }).then(function(images) {
      FilesService.deleteDirectory({ dir: 'products/' + product }).then(function(response) {
        res.json(response);
      }).catch(function(err) {
        return res.json(err);
      });
    }).catch(function(err) {
      return res.json(err.status, { err: err});
    })
  },

  _config: { actions: false, shortcuts: false, rest: false }
};

var Promise = require('bluebird');

function getCategories() {
  return new Promise(function(resolve, reject) {
    Category.find({}).populate('parentCategory').then(resolve).catch(reject);
  });
}

function getAncestors(parentId) {
  return new Promise(function(resolve, reject) {
    var ancestors = [];
    if (!!parentId) {
      Category.findOne(parentId).then(function(parent) {
        parent.ancestors.push(parentId);
        resolve(parent.ancestors);
      }).catch(reject);
    }
    if (!parentId) resolve(ancestors);
  });
}

function removeFromAncestors(category) {
  return new Promise(function(resolve, reject) {
    Category.find({}).then(function(categories) {
      var descendents = _.filter(categories, function (d) {
        return d.ancestors.indexOf(category) > -1;
      });
      for (var i = 0; i < descendents.length; i++) {
        (function(x) {
          var index = descendents[x].ancestors.indexOf(category);
          descendents[x].ancestors.splice(index, 1);
          descendents[x].save(function (err) {
            if (err) reject(err);
            if (!err && x === descendents.length - 1) resolve(true);
          });
        })(i);
      }
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
  });
}

function updateChildrenAncestors(category) {
  return new Promise(function(resolve, reject) {
    Category.find({}).then(function(categories) {
      var descendents = _.filter(categories, function (d) {
        return d.ancestors.indexOf(category) > -1;
      });
      if (!descendents.length) return resolve(true);
        for (var i = 0; i < descendents.length; i++) {
          (function(x) {
            getAncestors(descendents[x].parentCategory).then(function(ancestors) {
              descendents[x].ancestors = ancestors;
              descendents[x].save(function(err) {
                if (err) reject(err);
                if (!err && x === descendents.length - 1) resolve(true);
              });
            });
          })(i);
        }
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
  });
}

function createCategory(res, cat) {
  Category.create(cat).then(function() {
    getCategories().then(function(response) {
      res.json(response);
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
  }).catch(function(err) {
    return res.json(err.status, { err: err });
  });
}

module.exports = {
  getAll: function(req, res) {
    getCategories().then(function(response) {
      res.json(response);
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
  },

  create: function(req, res) {
    var cat = req.allParams(),
        parentCategoryId = cat.parentCategory ? cat.parentCategory.id : null;
    if (!!parentCategoryId) {
      getAncestors(parentCategoryId).then(function(ancestors) {
        cat.ancestors = ancestors;
        createCategory(res, cat);
      }).catch(function(err) {
        return res.json(err.status, { err: err });
      });
    }
    if (!parentCategoryId) createCategory(res, cat);
  },

  update: function(req, res) {
    var cat = req.allParams();
    cat.parentCategory = !!cat.parentCategory ? cat.parentCategory.id : null;
    getAncestors(cat.parentCategory).then(function(ancestors) {
      cat.ancestors = ancestors;
      Category.update(cat.id, cat).then(function() {
        updateChildrenAncestors(cat.id).then(function() {
          getCategories().then(function(response) {
            res.json(response);
          }).catch(function(err) {
            return res.json(err.status, { err: err });
          });
        }).catch(function(err) {
          return res.json(err.status, { err: err });
        });
      }).catch(function(err) {
        return res.json(err.status, { err: err });
      });
    });
  },

  remove: function(req, res) {
    var catToDelete = req.allParams().id,
      parent = req.allParams().parentCategory && JSON.parse(req.allParams().parentCategory).id || null,
      hasChildren = JSON.parse(req.allParams().hasChildren);

    Category.destroy(catToDelete).then(function() {
      if (hasChildren) {
        Category.update({parentCategory: catToDelete}, { parentCategory: parent }).then(function() {
          removeFromAncestors(catToDelete).then(function() {
            getCategories().then(function(response) {
              res.json(response);
            }).catch(function(err) {
              return res.json(err.status, { err: err });
            });
          }).catch(function(err) {
            return res.json(err.status, { err: err });
          });
        }).catch(function(err) {
          return res.json(err.status, { err: err });
        });
      } else {
        getCategories().then(function(response) {
          res.json(response);
        }).catch(function(err) {
          return res.json(err.status, { err: err });
        });
      }
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
  },

  _config: {actions: false, shortcuts: false, rest: false}
};

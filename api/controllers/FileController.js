var fs = require('fs-extra'),
    Promise = require('bluebird');

module.exports = {
  upload: function(req, res) {
    FilesService.upload({ req: req }).then(function(response) {
      return res.json(response);
    }).catch(function(err) {
      return res.json(err.status, { err: err });
    });
  },
  _config: { actions: false, shortcuts: false, rest: false }
};

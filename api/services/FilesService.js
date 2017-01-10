var fs = require('fs-extra'),
    Promise = require('bluebird');

module.exports = {
  upload: function(options, done) {
    return new Promise(function(resolve, reject) {
      var uploadOptions = {
        dirname: process.cwd() + '/.tmp/public/uploads/' + options.req.body.path,
        saveAs: function (__newFileStream, cb) { cb(null, __newFileStream.filename); }
      };

      options.req.file('file').upload(uploadOptions, function(err, files) {
        if (err) return res.serverError(err);
        var websrcDir = process.cwd() + '/websrc/uploads/' + options.req.body.path;

        fs.ensureDir(websrcDir, function(err) {
          if (err) return reject(err);
          for (var x = 0; x < files.length; x++) {
            var filename = files[x].fd.substring(files[x].fd.lastIndexOf('/') + 1),
                uploadLocation = process.cwd() + '/.tmp/public/uploads/' + options.req.body.path + filename,
                tempLocation = websrcDir + filename;

            (function(i) {
              fs.copy(uploadLocation, tempLocation, function(err) {
                if (err) return reject(err);
                if (i === files.length -1) return resolve(files);
              });
            })(x);
          }
        });
      });
    });
  },

  delete: function(options, done) {
    return new Promise(function(resolve, reject) {
      if (!!options.files.length) {
        for (var x = 0; x < options.files.length; x++) {
          var fileToRemove = process.cwd() + '/websrc/uploads/' + options.files[x].uri;
          (function(i) {
            fs.remove(fileToRemove, function(err) {
              if (err) return reject(err);
              if (i === options.files.length - 1) return resolve(options.files);
            });
          })(x);
        }
      }
    });
  },

  deleteDirectory: function(options, done) {
    return new Promise(function(resolve, reject) {
      if (!!options.dir) {
        var dir = process.cwd() + '/websrc/uploads/' + options.dir;
        fs.remove(dir, function(err) {
          if (err) return reject(err);
          return resolve(dir);
        });
      }
    });
  }
};

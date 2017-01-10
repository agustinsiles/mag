var cssAdminFilesToInject = [
  'dependencies/**/*.min.css',
  'admin/**/*.css'
],
cssSiteFilesToInject = [
  'site/**/*.css'
],
jsAdminFilesToInject = [
  'dependencies/socket.io.js',
  'dependencies/bower_components/angular/angular.min.js',
  'dependencies/bower_components/jquery/dist/jquery.min.js',
  'dependencies/**/*.min.js',
  'admin/app.js',
  'admin/**/*.js',
  //Exclude files
  '!dependencies/bower_components/angular-bootstrap/ui-bootstrap.min.js'
],
jsSiteFilesToInject = [
  'dependencies/socket.io.js',
  'dependencies/bower_components/angular/angular.min.js',
  'dependencies/bower_components/jquery/dist/jquery.min.js',
  'dependencies/**/*.min.js',
  'site/app.js',
  'site/config/accessLevels.js',
  'site/**/*.js',
  //Exclude files
  '!dependencies/bower_components/angular-bootstrap/ui-bootstrap.min.js'
],
templateFilesToInject = [
  'templates/**/*.html'
];

module.exports.cssSiteFilesToInject = cssSiteFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.cssAdminFilesToInject = cssAdminFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsSiteFilesToInject = jsSiteFilesToInject.map(function(path) {
  //Remove !Files, check in version older than 0.12.3 if this was fixed
  var tmpPath = '.tmp/public/';
  if (path.substring(0,1) == '!') return '!' + tmpPath + path.substring(1);
  return tmpPath + path;
});
module.exports.jsAdminFilesToInject = jsAdminFilesToInject.map(function(path) {
  var tmpPath = '.tmp/public/';
  if (path.substring(0,1) == '!') return '!' + tmpPath + path.substring(1);
  return tmpPath + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'websrc/' + path;
});

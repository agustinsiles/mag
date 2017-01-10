/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `websrc/css/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

	grunt.config.set('less', {
		devSite: {
    	files: {
      	'websrc/site/assets/css/result.css': 'websrc/site/assets/css/importer.less'
    	}
		},
		devAdmin: {
    	files: {
      	'websrc/admin/assets/css/result.css': 'websrc/admin/assets/css/importer.less'
    	}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};

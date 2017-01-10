/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

	grunt.config.set('concat', {
		js: {
			src: require('../pipeline').jsSiteFilesToInject,
			dest: '.tmp/public/concat/production.js'
		},
		jsAdmin: {
        src: require('../pipeline').jsAdminFilesToInject,
        dest: '.tmp/public/concat/productionAdmin.js'
    },
		css: {
			src: require('../pipeline').cssSiteFilesToInject,
			dest: '.tmp/public/concat/production.css'
		},
		cssAdmin: {
			src: require('../pipeline').cssAdminFilesToInject,
			dest: '.tmp/public/concat/production.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};

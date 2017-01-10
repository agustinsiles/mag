module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'html2js:dev',
		'less:devSite',
		'less:devAdmin',
		'sync:dev',
		'coffee:dev'
	]);
};

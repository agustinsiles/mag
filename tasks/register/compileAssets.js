module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'html2js:dev',
		'less',
		'copy:dev',
		'coffee:dev'
	]);
};

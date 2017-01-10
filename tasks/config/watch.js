module.exports = function(grunt) {

	grunt.config.set('watch', {
		assets: {
			options: {
	      livereload: true
	    },
			// Assets to watch:
			files: ['websrc/**/*', 'tasks/pipeline.js'],
			// When assets are changed:
			tasks: ['syncAssets' , 'linkAssets']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};

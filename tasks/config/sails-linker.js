/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {

	grunt.config.set('sails-linker', {
		devJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': require('../pipeline').jsSiteFilesToInject,
				'views/**/*.html': require('../pipeline').jsSiteFilesToInject,
				'views/**/*.ejs': require('../pipeline').jsSiteFilesToInject
			}
		},

		devJsAdmin: {
      options: {
        startTag: '<!--SCRIPTS_ADMIN-->',
        endTag: '<!--SCRIPTS_ADMIN END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': require('../pipeline').jsAdminFilesToInject,
        'views/**/*.html': require('../pipeline').jsAdminFilesToInject,
        'views/**/*.ejs': require('../pipeline').jsAdminFilesToInject
      }
    },

		devJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': require('../pipeline').jsSiteFilesToInject,
				'views/**/*.html': require('../pipeline').jsSiteFilesToInject,
				'views/**/*.ejs': require('../pipeline').jsSiteFilesToInject
			}
		},

		prodJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.js']
			}
		},

		prodJsAdmin: {
      options: {
        startTag: '<!--SCRIPTS_ADMIN-->',
        endTag: '<!--SCRIPTS_ADMIN END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/**/*.html': ['.tmp/public/min/productionAdmin.min.js'],
        'views/**/*.html': ['.tmp/public/min/productionAdmin.min.js'],
        'views/**/*.ejs': ['.tmp/public/min/productionAdmin.min.js']
      }
    },

		prodJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.js']
			}
		},

		devStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public'
			},

			files: {
				'.tmp/public/**/*.html': require('../pipeline').cssSiteFilesToInject,
				'views/**/*.html': require('../pipeline').cssSiteFilesToInject,
				'views/**/*.ejs': require('../pipeline').cssSiteFilesToInject
			}
		},

		devStylesAdmin: {
			options: {
				startTag: '<!--ADMIN_STYLES-->',
				endTag: '<!--ADMIN_STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public'
			},

			files: {
				'.tmp/public/**/*.html': require('../pipeline').cssAdminFilesToInject,
				'views/**/*.html': require('../pipeline').cssAdminFilesToInject,
				'views/**/*.ejs': require('../pipeline').cssAdminFilesToInject
			}
		},

		devStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'.tmp/public/**/*.html': require('../pipeline').cssSiteFilesToInject,
				'views/**/*.html': require('../pipeline').cssSiteFilesToInject,
				'views/**/*.ejs': require('../pipeline').cssSiteFilesToInject
			}
		},

		prodStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.css']
			}
		},

		prodStylesAdmin: {
			options: {
				startTag: '<!--ADMIN_STYLES-->',
				endTag: '<!--ADMIN_STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.css']
			}
		},

		prodStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.css']
			}
		},

		devJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': require('../pipeline').jsSiteFilesToInject
			}
		},

		devJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': require('../pipeline').jsSiteFilesToInject
			}
		},

		prodJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.js']
			}
		},

		prodJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.js']
			}
		},

		devStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssSiteFilesToInject
			}
		},

		devStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssSiteFilesToInject
			}
		},

		prodStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.css']
			}
		},

		prodStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.css']
			}
		},

		// Bring in JST template object
		devTplJade: {
			options: {
				startTag: '// TEMPLATES',
				endTag: '// TEMPLATES END',
				fileTmpl: 'script(type="text/javascript", src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/jst.js']
			}
		},

    // Bring in html2js/angular template cache template object
    devTpl: {
      options: {
        startTag: '<!--TEMPLATES-->',
        endTag: '<!--TEMPLATES END-->',
        fileTmpl: '<script type="text/javascript" src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/templates.js'],
        'views/**/*.html': ['.tmp/public/templates.js'],
        'views/**/*.ejs': ['.tmp/public/templates.js']
      }
    }
	});

	grunt.loadNpmTasks('grunt-sails-linker');
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	connect:{
		serve: {
			options: {
				port: 1000,
				base: '.',
				keepalive: true,
				open: {
					target: 'http://localhost:1000/index.html',
				}
			}
		}
	},  
	sass: {                              // Task
		dist: {                            // Target
		  options: {                       // Target options
			style: 'expanded'
		  },
		  files: {                         // Dictionary of files
			'css/style.css': 'css/style.scss'    // 'destination': 'source'
		  }
		}
	},
	// configure watch to auto update ------------------------------------------
	watch: {
	stylesheets: {
	files: ['css/*.css', '/**/*.scss'],
	tasks: ['sass']
	},
	scripts: {
	files: 'js/*.js',
	tasks: ['uglify']
	}
	},
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['uglify','sass','connect']);

};
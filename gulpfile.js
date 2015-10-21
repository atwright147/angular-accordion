var gulp = require('gulp'),
	angularProtractor = require('gulp-angular-protractor'),
 	connect = require('gulp-connect');
 
gulp.task('e2e', function() {
	connect.server();
	return gulp.src(['./src/tests/*.js'])
		.pipe(angularProtractor({
			'configFile': 'test/protractor.config.js',
			'args': ['--baseUrl', 'http://127.0.0.1:8000'],
			'autoStartStopServer': true,
			'debug': true
		}))
		.on('error', function(e) { throw e })
		.on('end', function() {
			connect.serverClose();
		});
});

gulp.task('default', ['e2e']);
'use strict';

var gulp           = require('gulp'),
    express        = require('express'),
    livereload     = require('connect-livereload'),
    refresh        = require('gulp-livereload'),
    lrserver       = require('tiny-lr')(),
    server         = express(),
    serverport     = 8000;

//Set up simple server w/live reload
gulp.task('serve', function() {

  server.use(livereload());

  server.use(express.static('./'));

  //static server
  server.listen(serverport);

  //live reload
  lrserver.listen();

});

// Watch for changes on files. Ignore node_modules.
gulp.task('watch', function() {

  gulp.watch([
    './**/*.*',
    '!./node_modules/**'
  ]).on('change', function (file) {
      refresh.changed(file.path);
  });

});

// Serve files at localhost:8000 and listen for changes.
gulp.task('default', ['serve', 'watch']);

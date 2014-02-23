'use strict';
var path = require('path');
var _ = require('lodash');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function(options) {
  options = _.extend({
    destination: 'index.html',
    property: 'files',
    sort: -1
  }, options || {});

  var list = [];
  var firstFile;

  function sortList() {
    function comparator(a, b) {
      if (options.sort === -1) return a.relative < b.relative;
      return a.relative > b.relative;
    }
    return list.sort(comparator);
  }

  function processFile(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-size', 'Streaming not supported'));
      return cb();
    }
    if (!firstFile) firstFile = file;

    list.push(file);
    cb();
  }

  function streamEnd(cb) {
    var joinedPath = path.join(firstFile.base, options.destination);
    var joinedFile = new gutil.File({
      cwd: firstFile.cwd,
      base: firstFile.base,
      path: joinedPath,
      contents: new Buffer('empty-on-purpose')
    });

    // set the list of files as property of File
    joinedFile[options.property] = sortList();
    this.push(joinedFile);
    cb();
  }

  return through.obj(processFile, streamEnd);
};

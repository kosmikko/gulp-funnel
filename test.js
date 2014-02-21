'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var funnel = require('./index');

it('should list files in a property "bar"', function(done) {
  var stream = funnel({
    dest: 'foo.html',
    property: 'bar'
  });

  stream.once('data', function(listFile){
    assert(listFile);
    assert(listFile.contents);
    assert.equal(listFile.bar.length, 2);
    done();
  });

  stream.write(new gutil.File({
    path: __dirname + '/fixture.js',
    contents: new Buffer(1234)
  }));

  stream.write(new gutil.File({
    path: __dirname + '/foo.js',
    contents: new Buffer(1934)
  }));

  stream.end();
  //done();
});
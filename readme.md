# [gulp](http://gulpjs.com)-funnel

> Join stream of files into an array, useful making e.g. list of files processed

## Motivation

Example, render a list of blog posts, using index.html as template

```javascript
var funnel = require('gulp-funnel');
gulp.task('index', function() {
  gulp.src('./posts/*.md')
    .pipe(frontMatter(fmOpts))
    .pipe(funnel())
    .pipe(nunjucks({defaultTemplate: 'index'}))
});
```

## Options

### destination

Destination filename, index.html by default

### property

Destination property of the File, where to store the list of files. 'files' by default.

### sort

Sort filelist, -1 for sorting descending, 1 ascending.

## License

MIT © [Mikko Lehtinen](https://twitter.com/kosmikko)

var minifyCss = require('gulp-minify-css'), // minify CSS;
    uglify = require('gulp-uglify'), // minify JS
    concat = require('gulp-concat'), // concat files
    linker = require('gulp-linker'), // making links to files
    sass = require('gulp-ruby-sass'),
    merge = require('merge-stream'),
    rename = require('gulp-rename'),
    cssRebaseUrls = require('gulp-css-rebase-urls'),
    gulp = require('gulp'),
    debug = require('gulp-debug');

var scriptsFilesList = [
    //packages
];
var ccsFilesList = [
    
];

// making JS
function jsToMin() {
    return gulp.src(scriptsFilesList)
        .pipe(uglify({mangle: false})) // uglify JS
        .pipe(concat('app.min.js')) // concat JS
        .pipe(gulp.dest('js/'))
        .pipe(debug({title: 'unicorn:'}));
}

gulp.task('jsToMin', function () {
    return jsToMin();
});

// making CSS
function cssToMin() {
    return gulp.src(ccsFilesList)
        .pipe(cssRebaseUrls({root: '/client/css'}))
        .pipe(concat('app.min.css')) // concat css
        .pipe(minifyCss())
        .pipe(gulp.dest('/client/css')) // write css;
        .pipe(debug({title: 'unicorn:'}));
}

gulp.task('cssToMin', function () {
    return cssToMin();
});


// Genering links to js/css files
function createTplForDevelopment() {
    // Read templates
    return gulp.src('client/index.html')
    // Link the JavaScript
        .pipe(
            linker({
                scripts: scriptsFilesList,
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script type="text/javascript" src="\%s"></script>',
                appRoot: 'client'
            }))
        // Link the CSS
        .pipe(linker({
            scripts: ccsFilesList,
            startTag: '<!--STYLES-->',
            endTag: '<!--STYLES END-->',
            fileTmpl: '<link rel="stylesheet" type="text/css" href="\%s"/>',
            appRoot: 'client'
        }))
        // Write modified files to client
        .pipe(gulp.dest('client'))
        .pipe(debug({title: 'unicorn:'}));
}
gulp.task('createTplForDevelopment', function () {
    return createTplForDevelopment();
});

gulp.task('dev', ['cssToMin', 'jsToMin'], function () {
    return merge(
        createTplForDevelopment()
    );
});

// default task
gulp.task('default', ['cssToMin', 'jsToMin'], function () {
    return merge(
        cssToMin(),
        jsToMin()
    );
});

// for develop
gulp.task('dev', function () {
    return merge(
        createTplForDevelopment()
    );
});

// for production
gulp.task('prod', ['cssToMin', 'jsToMin'], function () {
    return merge(
        cssToMin(),
        jsToMin()
    );
});
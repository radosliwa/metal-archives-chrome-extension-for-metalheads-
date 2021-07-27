const gulp = require('gulp'),
    del = require('del'),
    currentProjectName = 'Metal-archives-browser',

    /* STYLES START */
    autoprefixer = require('gulp-autoprefixer'),
    cssimport = require('gulp-cssimport'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    cssNano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    /* STYLES END */

    /* JS START */
    concatJs = require('gulp-concat'),
    webpack = require('webpack-stream'),
    { configVendors, config } = require('../webpack.config.js'),
    /* JS END */

    /* HTML START */
    htmlreplace = require('gulp-html-replace'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    { pathsDev, pathsBuild } = require('./paths'),
    paths = pathsDev;
/* HTML END */


const addProjectSuffix = () => currentProjectName ?? 'default';

gulp.task('clean', () => del([paths.temp, '!' + paths.temp + '/**/vendors']));
gulp.task('cleanAll', () => del([paths.temp]));

gulp.task('manifest', () =>
     gulp.src(['./manifest.json', './background.js'], { allowEmpty: true })
    .pipe(gulp.dest(paths.temp))
);

gulp.task('imgs', () => gulp.src('./src/images/*')
    .pipe(gulp.dest(paths.temp + '/images/')));
// ===========================STYLES

gulp.task('css_vendors', () => {
    return gulp.src(paths.srcCssVendors)
        .pipe(sourcemaps.init())
        .pipe(cssimport())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(concatCss('vendors-' + addProjectSuffix() + '.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.tempCssVendors));
});

gulp.task('css', () => {
    return gulp.src(paths.srcSCSS)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' })
            .on('error', sass.logError))
        .pipe(cssimport())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename('styles-' + addProjectSuffix() + '.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.tempCSS));
});

// ===========================HTML 
gulp.task('html', function () {
    return gulp.src(paths.srcHTML)
        .pipe(htmlreplace({
            'cssVendors': {
                src: 'styles/vendors/vendors-' + addProjectSuffix() + '.css',
                tpl: '<link rel="stylesheet" type="text/css" href="%s" />'
            },
            'css': {
                src: 'styles/styles-' + addProjectSuffix() + '.css',
                tpl: '<link rel="stylesheet" type="text/css" href="%s" />'
            },
            'js': {
                src: 'js/main.js',
                tpl: '<script type="text/javascript" src="%s" defer></script>'
            },
            'jsVendors': 'js/vendors.js'
        }))
        // .pipe(rename('popup.html'))
        .pipe(gulp.dest(paths.temp));
});

// ===========================SCRIPTS
gulp.task('jsVendors', function () {
    return gulp.src(paths.srcJSVendors)
        .pipe(webpack(configVendors, null, function (err, stats) {
            if (err) {
                console.log(err.toString());
            }
            if (stats.hasErrors()) {
                return new Error('STATS ERROR: ', stats.compilation.errors.join('\n'))
            }
            console.log('STATS: ', stats.toString());
        }))
        .pipe(gulp.dest(paths.tempJS));
});
gulp.task('js', function () {
    return gulp.src(paths.srcJS)
        .pipe(webpack(config, null, function (err, stats) {
            if (err) {
                console.log(err.toString());
            }
            if (stats.hasErrors()) {
                return new Error('STATS ERROR: ', stats.compilation.errors.join('\n'))
            }
            console.log('STATS: ', stats.toString());
        }))

        // .pipe(rename('scripts' + addProjectSuffix() + '.js'))
        .pipe(gulp.dest(paths.tempJS));
});


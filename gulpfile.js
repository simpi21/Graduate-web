// ////////////////////////////////////////////////
// Required Plugins 
// ///////////////////////////////////////////////

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var gulpPugBeautify = require('gulp-pug-beautify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var htmlbeautify = require('gulp-html-beautify');




// ////////////////////////////////////////////////
// Configuration
// ///////////////////////////////////////////////
var dest = './dist/';
var paths = {
	html: {
		entry: './src/pug/**/*.*pug',
		output: dest,
	},
	css: {
		entry:  ['./dist/assets/scss/**/*.*scss'],
		output: dest+'assets/css/',
		maps: '/scss'
	},
	js: {
		entry:  './src/js/**/*.js',
		output: dest+'assets/js/',
	},
	images: {
		entry:  './src/images/*',
		output: dest+'assets/img/',
	}
};





// ////////////////////////////////////////////////
// ======>> Dev Tasks
// ///////////////////////////////////////////////


// ////////////////////////////////////////////////
// Compile pug to HTML
// /////////////////////////////////////////////// 

gulp.task('html', function(){
  return gulp.src([paths.html.entry, '!*_*.pug'])
       .pipe(plumber())
       .pipe(pug({
                pretty:true
          }))
       .pipe(gulpPugBeautify({ omit_empty: true }))
       .pipe(gulp.dest(paths.html.output));
}
);





// ////////////////////////////////////////////////
// Compile scss to css
// /////////////////////////////////////////////// 
gulp.task('scss', function () {
  return  gulp.src(paths.css.entry)
              .pipe(sourcemaps.init())
              .pipe(plumber())
              .pipe(sass().on('error', sass.logError))      
              .pipe(autoprefixer('last 3 version', "> 1%", 'ie 8', 'ie 9'))
              .pipe(gulp.dest(paths.css.output)) 
              .pipe(sourcemaps.write(paths.css.maps));
});


// ////////////////////////////////////////////////
// Gulp watch 
// /////////////////////////////////////////////// 
gulp.task('watch', function () {
    gulp.watch(paths.scss.entry, ['scss']);
});




// ////////////////////////////////////////////////
// ======>> Production Tasks
// ///////////////////////////////////////////////

// ////////////////////////////////////////////////
// Compress images 
// ///////////////////////////////////////////////

gulp.task('images', function(){
  return gulp.src('assets/img/*')
             .pipe(imagemin())
             .pipe(gulp.dest('assets/images/'));
});

 
// ////////////////////////////////////////////////
// html beautify 
// ///////////////////////////////////////////////
gulp.task('htmlbeautify', function() {
  var options = {
    "indent_size": 2,
    space_in_paren:true,
};
  gulp.src('./src/html/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./dist/test/'));
});


// ////////////////////////////////////////////////
// Concat css 
// ///////////////////////////////////////////////
gulp.task('concatcss', function() {
    return gulp.src([
        dest+"assets/vendor/bootstrap/dist/css/bootstrap.min.css",
        dest+"assets/vendor/animate.css/animate.min.css",
        dest+"assets/vendor/fancybox-master/dist/jquery.fancybox.min.css",
        dest+"assets/vendor/owl.carousel/dist/assets/owl.carousel.min.css"
    ])
      .pipe(concat('vendors.bundle.css'))
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.css.output));
});


// ////////////////////////////////////////////////
// Concat Script
// ///////////////////////////////////////////////

gulp.task('concatjs', function() {
  return gulp.src([
        dest+"assets/vendor/jquery/dist/jquery.min.js",
        dest+"assets/vendor/popper.js/dist/popper.min.js",
        dest+"assets/vendor/bootstrap/dist/js/bootstrap.min.js",
        dest+"assets/vendor/smoothscroll/smoothscroll.js",
        dest+"assets/vendor/imagesloaded/imagesloaded.pkgd.min.js",
        dest+"assets/vendor/wow/dist/wow.min.js"
  ])
    .pipe(concat('vendors.bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.output));
});








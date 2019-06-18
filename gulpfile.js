const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const svgSprite = require('gulp-svg-sprite');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

// CSS
gulp.task('css', function () {
  return gulp.src('./src/css/app.css')
    .pipe(postcss([
        require('postcss-import'),
        postcssPresetEnv({
          features: {
            'nesting-rules': true
          }
        }),
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
        require('cssnano')
      ]))
    .pipe(gulp.dest('./themes/montreal/public/stylesheets'));
});


// icons
gulp.task('icons', function(done) {
  gulp.src('**/*.svg', { cwd: './src/icons' })
    .pipe(svgSprite(
      config = {
        mode: {
          symbol: true
        }
      }
    ))
    .pipe(gulp.dest('./opendk/views/partials'));
    done();
});


// js
gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./opendk/public/js'));
});


// server
gulp.task("server", cb => {
  let started = false;

  return nodemon({
    script: 'index.js',
    options: '-e', // -e means we watch for changes in templates too
    ext: 'js html',
    env: { 'API_URL': 'https://demo.ckan.org/api/3/action/' }
  }).on("start", () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});


// watching
gulp.task('watch:css', function() {
  return gulp.watch(['./src/css/**/*.css'],
  gulp.series('css'));
});

gulp.task('watch:icons', function() {
  return gulp.watch(['./src/icons/**/*.svg'],
  gulp.series('icons'));
});

gulp.task('watch:js', function() {
  return gulp.watch(['./src/js/**/*.js'],
  gulp.series('js'));
});

gulp.task('watch', gulp.parallel('watch:css', 'watch:icons', 'watch:js'));

// deafult task (this task is not completing..)
gulp.task('default', gulp.parallel('watch', 'server'));

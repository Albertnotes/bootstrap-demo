
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const minimist = require('minimist'); // 用來讀取指令轉成變數
const del = require('del');

// production || development
// # gulp --env production
const envOptions = {
  string: 'env',
  default: { env: 'development' }
};
const options = minimist(process.argv.slice(2), envOptions);
console.log(options);

gulp.task('del', () => {
  return del(['./.tmp', './public'], { read: false, allowEmpty: true }) // 選項讀取：false 阻止 gulp 讀取文件的內容，使此任務更快。
});

gulp.task('vendorJs', function () {
  return gulp.src([
    './node_modules/jquery/dist/jquery.slim.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
  ])
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('./public/javascripts'))
})


gulp.task('copy', function () {
  return gulp.src(['./source/**/**', '!source/scss/**/**'])
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('sass', function () {
  // PostCSS AutoPrefixer
  var processors = [
    autoprefixer({
      browsers: ['last 3 version','> 1%','not ie <= 8'],
    })
  ];

  return gulp.src(['./source/scss/**/*.sass', './source/scss/**/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested',
      includePaths: ['./node_modules/bootstrap/scss']
    })
      .on('error', $.sass.logError))
    .pipe($.postcss(processors))
    .pipe($.if(options.env === 'production', $.cleanCss())) // 假設開發環境則壓縮 CSS
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('browserSync', function () {
  browserSync.init({
    server: { baseDir: './public' },
    reloadDebounce: 2000
  })
});

gulp.task('deploy', function () {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});

//parallel 同時執行
//series 依序執行

gulp.task('build',
  gulp.series(
    'del',
    gulp.parallel('sass','vendorJs','copy'),
  )
)

gulp.task('default',
  gulp.series(
    'del',
    gulp.parallel('sass','vendorJs','copy'),
    function (done) {
      browserSync.init({
        server: { baseDir: './public' },
        reloadDebounce: 1500
      });
      gulp.watch(['./source/**/**', '!source/scss/**/**'], gulp.series(['copy']));
      gulp.watch(['./source/scss/**/*.sass', './source/scss/**/*.scss'], gulp.series(['sass']));
      done();
    }
  )
);
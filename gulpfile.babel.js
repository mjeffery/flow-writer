import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
	return gulp.src('src/styles/*.css')
		.pipe($.sourcemaps.init())
		.pipe($.autoprefixer({ browsers: ['> %1', 'last 2 versions', 'Firefox ESR'] }))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(reload({ stream: true }));
});

gulp.task('scripts', () => {
	return gulp.src('src/scripts/**/*.js')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(reload({ stream: true }));
});

gulp.task('html', ['styles', 'scripts'], () => {
	return gulp.src('src/**/*.html')
		.pipe($.useref({ searchPath: ['.tmp', 'src', '.'] }))
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.cssnano()))
		.pipe($.if('*.html', $.htmlmin({ collapseWhitespace: true })))
		.pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
	return gulp.src('src/images/**/*')
		.pipe($.cache($.imagemin({
			progressive: true,
			interlaced: true,
			svgoPlugins: [{ cleanupIDs: false }]
		})))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
	return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) { })
		.concat('src/fonts/**/*'))
		.pipe(gulp.dest('.tmp/fonts'))
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['html', 'styles', 'scripts', 'fonts'], () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'src'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	gulp.watch([
		'src/**/*.html',
		'src/images/**/*',
		'.tmp/fonts/**/*'
	]).on('change', reload);

	gulp.watch('src/styles/**/*.css', ['styles']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('src/fonts/**/*', ['fonts']);
	gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('wiredep', () => {
	gulp.src('src/*.html')
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest('src'));
});

gulp.task('build', ['html', 'images', 'fonts'], () => {
	return gulp
		.src('dist/**/*')
		.pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', ['clean'], () => {
	gulp.start('build');
});


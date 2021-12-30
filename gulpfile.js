var gulp       = require('gulp'), // Подключаем Gulp
	scss         = require('gulp-sass')(require('sass')), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	// imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
	rigger			 = require('gulp-rigger'),
	notify		 	 = require('gulp-notify'),
	pug					 = require('gulp-pug');
	

gulp.task('pug', function() {
	return gulp.src('src/pug/*.pug')
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('src/html'))
		.pipe(browserSync.reload({ stream: true }))
})
	
gulp.task('html', function () {
	return gulp.src('src/**/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({ stream: true }))
});
	
gulp.task('scss', function(){ // Создаем таск scss
	return gulp.src('src/scss/**/*.scss') // Берем источник
		.pipe(scss({outputStyle:'expanded'}).on("error", notify.onError())) // Преобразуем scss в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], /*{ cascade: true }*/)) // Создаем префиксы
		.pipe(gulp.dest('dist')) // Выгружаем результата в папку src
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'src/libs/jquery/jquery-1.12.min.js', // Берем jQuery
		'src/js/common.js' // Всегда в конце
		])
		.pipe(concat('scripts.js')) // Собираем их в кучу в новом файле scripts.js
		// .pipe(uglify()) // Сжимаем JS файл (main.min.js)
		.pipe(gulp.dest('dist/js')) // Выгружаем в папку src/js
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') // Берем все изображения из src
		// .pipe(cache(imagemin({ // С кешированием
		// // .pipe(imagemin({ // Сжимаем изображения без кеширования
		// 	interlaced: true,
		// 	progressive: true,
		// 	svgoPlugins: [{removeViewBox: false}],
		// 	use: [pngquant()]
		// }))/**/)
		.pipe(gulp.dest('dist/img')) // Выгружаем на продакшен
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
	.pipe(browserSync.reload({ stream: true }));
})

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'dist' // Директория для сервера - src
		},
		open: false,
		notify: false // Отключаем уведомления
	});
});

gulp.task('watch', function() {
	// gulp.watch('src/scss/**/*.scss', function(event, cb) {
	// 	setTimeout(function() {gulp.start('scss');}, 300)
	// });
	gulp.watch('src/scss/**/*.scss', gulp.parallel('scss')); // Наблюдение за scss файлами в папке scss
	gulp.watch('src/**/*.pug', gulp.parallel('pug')); // Наблюдение за pug файлами
	gulp.watch('src/**/*.html', gulp.parallel('html')); // Наблюдение за html файлами
	gulp.watch('src/js/**/*.js', gulp.parallel('scripts')); // Наблюдение за JS файлами в папке js
	gulp.watch('src/fonts/**/*', gulp.parallel('fonts')); // Наблюдение за fonts
	gulp.watch('src/img/**/*', gulp.parallel('img')); // Наблюдение за img
});

gulp.task('clean', function(done) {
	del.sync('dist'); // Удаляем папку dist перед сборкой
	done();
});


gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', gulp.parallel('clean', 'pug', 'html', 'scss', 'scripts', 'img', 'fonts', 'browser-sync', 'watch'));

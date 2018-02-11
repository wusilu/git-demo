

var gulp = require("gulp");
var less = require("gulp-less")

var browserSync = require("browser-sync").create();

gulp.task("say",function(){
	//console.log("hello world");

	gulp.src("src/index.html")
	.pipe(gulp.dest("dist/"))
})

// 复制文件
gulp.task("copy",function(){
	gulp.src("src/index.html")
	.pipe(gulp.dest("dist/"))
})

gulp.task("dist",function(){
	gulp.watch("src/index.html",['copy'])
	gulp.watch("src/style/*.less",['style'])
})

// 1. 压缩css文件
var cleanCss = require("gulp-clean-css");
// 把less编写为css
gulp.task("style",function(){
    gulp.src("src/style/*.less")
    .pipe(less())
    .pipe(cleanCss()) // 压缩css文件
    .pipe(gulp.dest("dist/style/"))
    .pipe(browserSync.reload({
		stream:true
	}));
})

// 2.压缩合并js文件
var concat = require("gulp-concat");   //  合并
var uglify = require("gulp-uglify");   //  压缩
gulp.task("script",function(){
	gulp.src("src/script/*.js")
	.pipe(concat("all.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/script"))
	.pipe(browserSync.reload({
		stream:true
	}));
})

// 3.压缩html
var htmlmin = require("gulp-htmlmin");

gulp.task("html",function(){
	gulp.src("src/*.html")
	.pipe(htmlmin({
		collapseWhitespace:true
	})).pipe(gulp.dest("dist/"))
	.pipe(browserSync.reload({
		stream:true
	}));
})




// browser-sync

gulp.task("serve",function(){
	browserSync.init({
		server:{
			baseDir:"dist"
		}
	});
	gulp.watch("src/style/*.less",['style']);
	gulp.watch("src/script/*.js",['script']);
	gulp.watch("src/*.html",['html']);
});

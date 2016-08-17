var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

//CHECK STYLES
gulp.task('style', function(){
    //PULL IN JS FILES 
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
    //RETURN SO WE CAN USE IT AS A SUBTASK
});

//INJECT MY FILES IN INDEX.HTML
gulp.task('inject', function(){
    //WIREDEP LOOKS AT MY BOWER.JSON DEPENDENCIES
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    
    var injectSrc = gulp.src(['./public/css/*.css','./public/js/*.js'], {read: false});
    var injectOptions = {
      ignorePath: '/public'  
    };
    
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
    
    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});
//
//INJECT STYLE AND INJECTS
gulp.task('serve', ['style','inject'], function(){
    //OPTIONS - everything nodemon needs for nodemon to run
    var options = {
        script: 'app.js',
        delayTime: 1,
        env : {
            //DATABASE STRINGS
            //PORTS
            //ETC
            'PORT': 3000
        },
        watch: jsFiles
        //WATCH FOR JS FILES
    };
    
    return nodemon(options)
        //RESTART SERVER
        .on('restart', function(ev){
        console.log('RESTARTING.......');
    });
});
import gulp from 'gulp'
import gutil from 'gulp-util'
import clean from 'gulp-clean'

import sass from 'gulp-ruby-sass'
import autoprefixer from 'gulp-autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import cleanCSS from 'gulp-clean-css'
import base64 from 'gulp-base64'

import uglify from 'gulp-uglify'
import named from 'vinyl-named'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'


const
    dirs = {
        npm: './node_modules',
        src: './frontend',
        data_images: './frontend/data-images',
        src_images: './frontend/images',
        dest: './main/static'
    },
    files = {
        vendor: {
        },
        source: {
            scripts: [
                `${dirs.src}/scripts/app.js`
            ],
            style: `${dirs.src}/styles/styles.sass`
        },
        dest: {
            scripts: `${dirs.dest}/scripts`,
            images: `${dirs.dest}/images`,
            styles: `${dirs.dest}/styles`,
            fonts: `${dirs.dest}/fonts`
        }
    },
    production = gutil.env.type === 'production';


gulp.task('clean', () => {
    for(let i of Object.keys(files.dest)){
        gulp.src(files.dest[i], {read: false}).pipe(clean());
    }
});


gulp.task('copy', () => {
    gulp.src(`${dirs.src_images}/**/*.*`)
        .pipe(gulp.dest(files.dest.images));
});


gulp.task('sass', () => {
    return sass(files.source.style, {sourcemap: !production})
        .on('error', sass.logError)
        .pipe(base64({
            maxImageSize: 8 * 1024, // bytes
            baseDir: `${dirs.src}/data-images/`,
            extensions: ['png', 'gif'],
            debug: false
        }))
        .pipe(autoprefixer({
            browsers: ['> 5%', 'last 2 versions', 'IE 8'],
            cascade: !production
        }))
        .pipe(production ? cleanCSS({compatibility: 'ie8'}) : gutil.noop())
        .pipe(production ? gutil.noop() : sourcemaps.write())
        .pipe(gulp.dest(files.dest.styles));
});


gulp.task('compile', () => {
    return gulp.src(files.source.scripts)
        .pipe(named())
        .pipe(webpackStream({
            watch: !production,
            devtool: production ? null : 'eval-source-map',
            resolve: {
                extensions: ['', '.js', '.jsx']
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: ['babel-loader'],
                        exclude: /node_modules/,
                        query: {
                            plugins: ['transform-runtime', 'transform-decorators-legacy'],
                            presets: ['es2015', 'stage-0', 'react']
                        }
                    }
                ]
            },
            plugins:[
                new webpack.DefinePlugin({
                    'process.env':{
                        'NODE_ENV': production ? JSON.stringify('production') : process.env.NODE_ENV
                    }
                })
            ]
        }))
        .pipe(production ? uglify() : gutil.noop())
        .pipe(gulp.dest(files.dest.scripts));
});


gulp.task('watch', () => {
    gulp.watch(`${dirs.src_images}/**/*.*`, ['copy']);
    gulp.watch(`${dirs.data}/**/*.*`, ['copy']);
    gulp.watch(`${dirs.src}/**/*.{sass,scss}`, ['sass']);
});


let task_pool = ['copy', 'sass', 'compile'];
if(gutil.env.type !== 'production') {
    task_pool.push('watch');
}


gulp.task('default', task_pool);

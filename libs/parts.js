const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const hashFile = require('hash-file');
const hashFiles = require('hash-files');
const fs = require('fs');
const crypto = require('crypto');

exports.devServer = function (options) {
    return {
        // Override filename (our index.html points to '../dist/app.js',
        // not 'localhost:8080/dist/app.js'). Better to change here because
        // this export is conditional (based on dev server running or not)
        output: {
            filename: './' + options.paths.dist + '/' + options.paths.src
        },

        devServer: {
            // Want to look at the content in this folder
            contentBase: './src',

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Unlike the cli flag, this doesn't set
            // HotModuleReplacementPlugin!
            hot: true,
            inline: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            //
            // If you use Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices
            // unlike default `localhost`.
            host: options.host, // Defaults to `localhost`
            port: options.port // Defaults to 8080
        },
        plugins: [
            // Enable multi-pass compilation for enhanced performance
            // in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
}

exports.setupCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css?sourceMap&modules!sass?sourceMap'],
                    include: paths
                }
            ]
        }
    };
}

exports.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({

                sourceMap: true,

                // Eliminate comments
                comments: false,

                // Compression specific options
                compress: {
                    warnings: false,

                    // Drop 'console' statements
                    // drop_console: true
                },

                // Mangling specific options
                mangle: {

                    // Avoid mangling the Webpack runtime (dunno why, suggested here: 
                    // http://survivejs.com/webpack/building-with-webpack/minifying-build/)
                    except: ['webpackJsonp'],

                    // Don't care about IE8
                    screw_ie8: true
                }
            })
        ]
    }
}

exports.setFreeVariable = function (key, value) {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
}

exports.extractBundle = function (options) {
    const entry = {};
    entry[options.name] = options.entries;

    return {
        // Define an entry point needed for splitting.
        entry: entry,
        plugins: [
            // Extract bundle and manifest files. Manifest is
            // needed for reliable caching.
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest']
            })
        ]
    }
}

exports.clean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                // Without 'root' CleanWebpackPlugin won't point to our
                // project and will fail to works
                root: process.cwd()
            })
        ]
    }
}

exports.extractCSS = function (paths) {
    // Calc hash for style bundle name
    const fsContents = paths.map(function (path) {
        return fs.readFileSync(path);
    }).join();
    const fileHash = crypto.createHash('sha256').update(fsContents).digest("hex").substring(0, 20);

    // The module
    return {
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.scss$/,
                    // If you want to pass more loaders to the ExtractTextPlugin, 
                    // you should use ! syntax. 
                    // Example: ExtractTextPlugin.extract({ ..., loader: 'css!postcss'}).
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: 'style',
                        loader: 'css?sourceMap&modules!sass?sourceMap'
                    })
                    // include: paths
                }
            ]
        },
        // postcss: function () {
        //     return [
        //         require('postcss-nesting'),
        //         require('postcss-advanced-variables')
        //     ]
        // },
        plugins: [
            // new webpack.LoaderOptionsPlugin({
            //     options: {
            //         postcss: [
            //             require('postcss-nested')(),
            //             require('postcss-simple-vars')()
            //         ]
            //     }
            // }),

            // Output extracted CSS to a file
            new ExtractTextPlugin({
                filename: 'style.' + fileHash + '.css',
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    };
}

exports.compress = function () {
    return {
        plugins: [
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css$/
            })
        ]
    }
}

// exports.purifyCSS = function (paths) {
//     console.log(process.cwd() + '/dist');
//     return {
//         plugins: [
//             new PurifyCSSPlugin({
//                 basePath: process.cwd(),

//                 // 'paths' is used to point purifyCSS to files not
//                 // visible to Webpack. You can pass glob patterns to it
//                 paths: paths,

//                 options: {
//                     output: process.cwd + 'distcss'
//                 }
//             })
//         ]
//     };
// }
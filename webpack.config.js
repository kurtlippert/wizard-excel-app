const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Build (for prod) or Serve (dev)
const TARGET = process.env.npm_lifecycle_event;

// Set Babel env. Important for HMR
process.env.BABEL_ENV = TARGET;

// minified versions of react and react dom
// to be applied via cdn in our template.ejs file (for prod)
const min = (TARGET === 'build') ? '.min' : '';

const PATHS = {
    // src: path.join(__dirname, 'src', '**', '*.tsx'),
    // style: path.join(__dirname, 'src', '**', '*.css'),
    // src: path.join(__dirname, 'src'),
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    semantic: path.join(__dirname, 'node_modules', 'semantic-ui-react'),
    vendor: [
        path.join(__dirname, 'node_modules', 'semantic-ui-css', 'semantic.css')
    ]
};

const common = {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        // src: glob.sync(PATHS.src),
        // style: glob.sync(PATHS.style)
        src: PATHS.src
    },

    output: {
        path: PATHS.dist,
        filename: '[name].js'
    },

    externals: {
        'react': 'React', 
        'react-dom' : 'ReactDOM' 
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                loaders: [
                    // 'awesome-typescript-loader',
                    //'tslint-loader'
                    // Enable caching for improved performance during development
                    // It uses default OS directory by default. If you need
                    // something more custom, pass a path to it.
                    // I.e., babel?cacheDirectory=<path>
                    'babel-loader?cacheDirectory'
                ],
                // Parse only app files! Without this it will go through
                // the entire project. In addition to being slow,
                // that will most likely result in an error.
                include: [ PATHS.src, PATHS.semantic]
            }
        ]
    },

    // If production, I want minified cdn version, full otherwise
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            title: 'Onboarding Wizard',
            inject: 'body',
            scripts: [
                '//unpkg.com/react@15/dist/react' + min + '.js',
                '//unpkg.com/react-dom@15/dist/react-dom' + min + '.js'                
            ]
        })
    ]
};

var config;

switch (TARGET) {
    case 'build':
    case 'stats':
        config = merge(
            common,

            {
                devtool: 'source-map',
                output: {
                    path: PATHS.dist,

                    // Tweak this to match your GitHub project name
                    // publicPath: '/wizard-excel-app/',

                    filename: '[name].[chunkhash].js',

                    // This is used for require.ensure.
                    // The setup will work without but this is useful to set.
                    chunkFilename: '[chunkhash].js'
                }
            },

            // If we need to preserve dotfiles within 'dist' directory,
            // use 'path.join(PATHS.dist, '*')' instead of 'PATHS.dist'
            parts.clean(PATHS.dist),

            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),

            // parts.extractBundle({
            //     name: 'react',
            //     entries: ['react', 'react-dom']
            // }),

            // parts.minify(),

            // parts.processCSS(glob.sync(PATHS.src + '/**/*.css'), PATHS.src, PATHS.dist)

            parts.extractCSS(PATHS.src, PATHS.vendor, PATHS.dist)

            // parts.externalCSS(PATHS.style)

            // parts.compress()

            // parts.purifyCSS([PATHS.semantic])

            // parts.processCSS()
        );
        break;
    default:
        config = merge(
            common,

            parts.setupCSS(),

            {
                devtool: 'eval-source-map',
            },

            parts.devServer({
                paths: PATHS,
                host: process.env.HOST,
                port: 3000
            })
        );
}

module.exports = validate(config, {
    quiet: true
});
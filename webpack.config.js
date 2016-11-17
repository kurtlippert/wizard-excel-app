const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const min = (process.env.npm_lifecycle_event === 'webpack:build') ?
            '.min' :
            '';

const PATHS = {
    // src: path.join(__dirname, 'src', '**', '*.tsx'),
    // style: path.join(__dirname, 'src', '**', '*.css'),
    // src: path.join(__dirname, 'src'),
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

const common = {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        // src: glob.sync(PATHS.src),
        // style: glob.sync(PATHS.style)
        src: PATHS.src,
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
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loaders: [
                    // 'awesome-typescript-loader',
                    'awesome-typescript-loader',
                    'tslint-loader'
                ]
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: 'source-map-loader'
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
                'https://unpkg.com/react@15/dist/react' + min + '.js',
                'https://unpkg.com/react-dom@15/dist/react-dom' + min + '.js'
            ]
        })
    ]
};

var config;

switch (process.env.npm_lifecycle_event) {
    case 'webpack:build':
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

            parts.minify(),

            parts.extractCSS(glob.sync(PATHS.src + '/**/*.scss'))

            // parts.compress()

            // parts.purifyCSS([PATHS.src])

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
                port: '3000'
            })
        );
}

module.exports = validate(config, {
    quiet: true
});
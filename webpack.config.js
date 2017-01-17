const path              = require( 'path' );
const webpack           = require( 'webpack' );
const merge             = require( 'webpack-merge' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const PurifyCSSPlugin   = require( 'purifycss-webpack-plugin' );
const OptimizeCSSPlugin = require( 'optimize-css-assets-webpack-plugin' );
const CleanDistPlugin   = require( 'clean-webpack-plugin' ); 
const entryPath         = path.join( __dirname, 'src/static/index.js' );
const outputPath        = path.join( __dirname, 'dist' );

console.log( 'WEBPACK GO!');

// determine build env
const TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';
const outputFilename = TARGET_ENV === 'production' ? '[name].[hash].js' : '[name].js';
const vendorCSSName = TARGET_ENV === 'production' ? 'vendor.[contenthash].css' : 'vendor.css';

// common webpack config
const commonConfig = {

  output: {
    path:       outputPath,
    filename:   outputFilename,
  },

  resolve: {
    extensions: ['.js', '.elm']
  },

  module: {
    noParse: /\.elm$/,
    loaders: [
//      {
//        test:   /\.(eot|ttf|woff|woff2|svg)$/,
//        loader: 'file-loader'
//      },
//      {
//        test:   /\.(png|jpg)$/,
//        loader: 'url-loader?limit=25000',
//      },
//      {
//        test:   /\.(woff|woff2|ttf|eot)$/,
//        loader: 'url-loader?limit=50000',
//      },
//      {
//        test:   /\.svg$/,
//        loader: 'file-loader',
//      },
{
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=25000'
    }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/static/index.template.ejs',
      inject:   'body',
      title:    'Onboarding Wizard'
    }),
  ],

}

// additional webpack settings for local env (when invoked by 'npm start')
if ( TARGET_ENV === 'development' ) {
  console.log( 'Serving locally...');

  module.exports = merge( commonConfig, {

    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      entryPath
    ],

    devtool: 'eval-source-map',

    // suppress perf hints in browser devtools
    performance: { hints: false },
    
    devServer: {
      // serve index.html in place of 404 responses
      historyApiFallback: true,

      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: false,
        warnings: false,
        publicPath: false
      }
    },

    module: {
      loaders: [
        {
          test:    /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader:  'elm-hot-loader!elm-webpack-loader?verbose=true&warn=true&debug=true',
        },
        {
          test:   /\.css$/i,
          loader: 'style-loader!css-loader?sourceMap',
        },
      ]
    }
  });
}

// additional webpack settings for prod env (when invoked via 'npm run build')
if ( TARGET_ENV === 'production' ) {
  console.log( 'Building for prod...');

  module.exports = merge( commonConfig, {

    entry: entryPath,

    module: {
      loaders: [
        {
          test:    /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader:  'elm-webpack-loader'
        },
        {
          test:   /\.css$/i,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader'
          }),          
        },
      ]
    },

    plugins: [
      new CleanDistPlugin('dist', {
        root: __dirname
      }),

      new ExtractTextPlugin(vendorCSSName),

      // minify & mangle JS/CSS
      new webpack.optimize.UglifyJsPlugin({
          minimize:   true,
          compressor: { warnings: false }
          // mangle:  true
      }),

      new PurifyCSSPlugin({
        basePath: outputPath,
        paths: ['index.html']
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true }},
      }),
    ],
  });
}

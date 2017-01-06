var path              = require( 'path' );
var webpack           = require( 'webpack' );
var merge             = require( 'webpack-merge' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var PurifyCSSPlugin   = require( 'purifycss-webpack-plugin' );
var OptimizeCSSPlugin = require( 'optimize-css-assets-webpack-plugin' );
var CleanDistPlugin   = require( 'clean-webpack-plugin' ); 
var entryPath         = path.join( __dirname, 'src/static/index.js' );
var outputPath        = path.join( __dirname, 'dist' );

console.log( 'WEBPACK GO!');

// determine build env
var TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';
var outputFilename = TARGET_ENV === 'production' ? '[name].[hash].js' : '[name].js'

// common webpack config
var commonConfig = {

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
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
        }),
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=25000',
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=50000',
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/static/index.template.ejs',
      inject:   'body',
      title:    'Onboarding Wizard'
    }),

    new ExtractTextPlugin('vendor.[chunkhash].css'),
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
    
    devServer: {
      // serve index.html in place of 404 responses
      historyApiFallback: true,
    },

    module: {
      loaders: [
        {
          test:    /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader:  'elm-hot-loader!elm-webpack-loader?verbose=true&warn=true&debug=true'
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
      ]
    },

    plugins: [
      // minify & mangle JS/CSS
      new webpack.optimize.UglifyJsPlugin({
          minimize:   true,
          compressor: { warnings: false }
          // mangle:  true
      }),
      new CleanDistPlugin('dist', {
        root: __dirname
      }),
      new PurifyCSSPlugin({
        basePath: outputPath,
        paths: ['index.html']
      }),
      new OptimizeCSSPlugin()
    ]
  });
}

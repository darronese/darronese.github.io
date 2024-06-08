const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),  // Output to 'build' directory
    filename: 'bundle.js',
    publicPath: '/'  // Ensure assets are served correctly
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Reference 'public/index.html'
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/404.html', to: '404.html' },
        { from: './public/about.html', to: 'about.html' },
        { from: './public/projects.html', to: 'projects.html' },
        { from: './public/resume.html', to: 'resume.html' },
        { from: './public', to: './', globOptions: { ignore: ['**/index.html'] } }  // Copy everything except index.html
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),  // Serve from 'build' directory
      watch: true  // Watch for changes in the static files
    },
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: true  // Ensure SPA routing works
  }
};

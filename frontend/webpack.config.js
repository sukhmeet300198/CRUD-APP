const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Your entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
    publicPath: '/' // Necessary for React Router
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Image files
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  devServer: {
    historyApiFallback: true, // For React Router
    contentBase: './dist',
    hot: true,
  },
};

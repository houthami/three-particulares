const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: './src/index.tsx', 

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|pdf|...)$/,
        use: 'file-loader',
      },
      {
        test: /\.glsl$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ],
  devtool: "source-map",
  devServer: {
    contentBase: './dist/',
  },
};

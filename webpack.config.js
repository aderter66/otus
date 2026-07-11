const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        oneOf: [
          {
            test: /\.module\.css$/i,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    namedExport: false,
                  },
                },
              },
            ],
          },
          {
            test: /\.css$/i,
            exclude: /\.module\.css$/i,
            include: [path.resolve(__dirname, 'src')],
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
            ],
          },
          {
            test: /\.svg$/i,
            type: 'asset/resource',
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};

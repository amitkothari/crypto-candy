const sveltePreprocess = require('svelte-preprocess');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

module.exports = {
  entry: {
    'build/bundle': ['./src/main.js'],
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !isProduction,
            },
            emitCss: true,
            preprocess: sveltePreprocess({
              postcss: {
                plugins: [tailwindcss, autoprefixer],
              },
            }),
            hotReload: !isProduction,
          },
        },
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new NodePolyfillPlugin(),
  ],
  devtool: isProduction ? false : 'source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
};

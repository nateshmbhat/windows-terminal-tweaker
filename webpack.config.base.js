/** useStoreActions(actions => actions.setConfigFilePath)
 * Base webpack config used across other specific configs
 */

const path = require('path');
const webpack = require('webpack');
const pkgDep = require('./package.json');


module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(html|svelte|ts|tsx|js)$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: '__PRODUCT_NAME__', replace: JSON.stringify(pkgDep.productName) , flags : 'g' },
              { search: '__COPYRIGHT__', replace: JSON.stringify(pkgDep.license) , flags : 'g' },
              { search: '__HOMEPAGE__', replace: JSON.stringify(pkgDep.homepage) , flags : 'g' },
              { search: '__DESCRIPTION__', replace: JSON.stringify(pkgDep.description) , flags : 'g' },
              { search: '__LICENSE__', replace: JSON.stringify(pkgDep.license) , flags : 'g' },
              // { search: '__BUG_REPORT_URL__', replace: JSON.stringify(pkgDep.bugs.url) , flags : 'g' },
              { search: '__VERSION__', replace: JSON.stringify(pkgDep.version) , flags : 'g' },
              { search: '__APP_DISPLAY_NAME__', replace: JSON.stringify(pkgDep.displayName) , flags : 'g' },
            ],
          },
        },
      }
    ]
  },

  output: {
    path: path.join(__dirname, 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, 'app'), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new webpack.NamedModulesPlugin(),
  ]
};

const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin   = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const sass = require('sass')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  function commonPlugins() {
    return [
      new VueLoaderPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: isProduction ? 'production' : 'development'
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].css'
      }),
      new Dotenv()
    ]
  }

  function devPlugins() {
    return commonPlugins()
  }

  function productionPlugins() {
    return [
      new CopyPlugin({
        patterns: [
          {
            from: 'public/**/*',
            to: '[name][ext]',
            transform: (content, filepath) => {
              if (filepath.includes("_redirects")) {
                // Write the Netlify _redirects file, with the api url proxy defined by environment
                return content.toString().replace("{{API_BASE_URL}}", process.env.API_BASE_URL)
              } else {
                return content
              }
            }
          },
        ]
      })
    ].concat(commonPlugins()).concat([
      // new BundleAnalyzerPlugin()
    ])
  }

  return {
    target: 'web',
    mode: isProduction ? 'production' : 'development',
    entry: {
      index: './client/index.ts',
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.scss'],
      alias: {
        // Use runtime-only vue to reduce bundle size https://medium.com/@joanxie/utilize-webpacks-tree-shaking-in-your-vue-application-a0dc63c0dfac
        'vue$': 'vue/dist/vue.runtime.esm.js'
      },
    },

    output: {
      filename: 'assets/js/[name].js',
      path: path.resolve(__dirname, './client/dist/'),
      publicPath: '/'
    },

    module: {
      rules: [
        { // TypeScript loader!
          test: /\.ts$/,
          // TODO use webpack 5 resolve.restrictions for server when it's available
          exclude: /server|node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsSuffixTo: [/\.vue$/],
              }
            }
          ]
        },

        { // Vue loader must come after TS loader, or we get strange bug
          // where dev server can't find vue components on reload.
          test: /\.vue$/,
          loader: 'vue-loader'
        },

        { // Process imported stylesheets as well as Vue style segments.
          test: /\.s?css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',

            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },

            {
              loader: 'sass-loader',
              options: {
                // Prefer `dart-sass` cos node-sass seems troublesome
                implementation: sass,
                sourceMap: true
              }
            }
          ]
        },

        { // Custom handle the indented SASS syntax.
          test: /\.sass$/,
          use: [
            MiniCssExtractPlugin.loader,

            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },

            {
              loader: 'sass-loader',
              options: {
                implementation: sass,
                sourceMap: true,
                sassOptions: {
                  indentedSyntax: true
                }
              }
            }
          ]
        },
        {
          // Images
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          type: 'asset'
        },
        {
          test: /\.tsv$/,
          loader: 'csv-loader',
          options: {
            skipEmptyLines: true,
            delimiter: "\t"
          }
        }
      ]
    },

    plugins: isProduction ? productionPlugins() : devPlugins(),

    // Sourcemap settings recommended by ts-loader documentation
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',

    devServer: isProduction ? undefined : {
      host: 'localhost',
      hot: true,
      port: 5999,
      static: {
        directory: path.resolve(__dirname, './public/')
      },
      proxy: {
        // Proxying this avoids CORS issues in development
        '/api': {
          target: "http://localhost:8787"
        }
      },
      historyApiFallback: {
        rewrites: [
          { from: /./, to: '/index.html' }
        ]
      }
    }
  }
}

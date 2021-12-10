const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin   = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const sass = require('sass')
const SveltePreprocess = require("svelte-preprocess")

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  function commonPlugins() {
    return [
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
      extensions: ['.ts', '.js', '.vue', '.scss', '.svelte'],
      alias: {
        svelte: path.resolve('node_modules', 'svelte')
      },
      mainFields: ['svelte', 'browser', 'module', 'main']
    },

    output: {
      filename: 'assets/js/[name].js',
      path: path.resolve(__dirname, './client/dist/'),
      publicPath: '/'
    },

    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              preprocess: SveltePreprocess({})
            },
          },
        },


        { // TypeScript loader!
          test: /\.ts$/,
          // TODO use webpack 5 resolve.restrictions for server when it's available
          exclude: /server|node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: !isProduction // Do full typechecking for production builds
              }
            }
          ]
        },

        { // Process imported stylesheets as well as Vue style segments.
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
          ]
        },
        {
          // Images
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          type: 'asset'
        },
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

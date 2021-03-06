/**
 * @description webpack 配置
 * @author zdzDesigner
 */
var webpack = require('webpack')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')


var _package = require('./package.json')


console.log(process.env.NODE_ENV ? 'pro':'dev')


module.exports = {
    entry: {
        cssasset: __dirname + '/src/assets/sass/app.scss',
        app: __dirname + '/src/app/index.js',
        vuecore: __dirname + '/src/app/vuecore.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]_[chunkhash:8].js',
        chunkFilename: '[name]_[chunkhash:8].js',
        publicPath: './'
    },

    module: {
        loaders: [{
            test: /\.(scss|css)$/,
            loader: ExtractTextPlugin.extract('css-loader!sass-loader')
        }, {
            test: /\.(tpl|html)$/,
            loader: 'html'
        }, {
            test: /\.vue$/,
            loader: 'vue',
            options: {
                cssModules: {
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                    camelCase: true
                }
            }            
        }, {
            test: /\.js$/,
            // excluding some local linked packages.
            // for normal use cases only node_modules is needed.
            exclude: /(.\.min\.js)|node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel'

        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader-path?limit=8192&name=[name].[ext]?[hash:8]&path=../[name].[ext]?[hash:8]'
        }]
    },
    vue: {
        loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            html: 'vue-html-loader'
        }
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        alias: {
             KsComponents: path.resolve(__dirname, 'src/ks/components')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'APP_ENV': JSON.stringify(process.env.NODE_ENV ? 'pro':'dev'),
            'APP_VERSION': JSON.stringify(_package.version)
        }),
        new webpack.ProvidePlugin({
            'Vue': 'vue',
            'Service': __dirname +'/src/app/service/index.js',
            'VueResource': 'vue-resource'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['manifest','vuecore'].reverse()
        }),
        new ExtractTextPlugin('app_[chunkhash:8].css'),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            title:'十钉物联 · 智能终端管理平台',
            template:'index.ejs',
            inject:false,
            minify: {
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new InlineManifestWebpackPlugin()
    ]

};
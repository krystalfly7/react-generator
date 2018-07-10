const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loadRules = require('./config/loadRules');

const entry = {};
entry.libs = [ 'react', 'react-dom', 'superagent'];

const vendor = [
	'antd/es/button',
	'antd/es/checkbox',
	'antd/es/date-picker',
	'antd/es/form',
	'antd/es/input',
	'antd/es/input-number',
	'antd/es/message',
	'antd/es/modal',
	'antd/es/select',
	'antd/es/table',
];
entry.vendor = vendor.reduce(function (prev, curr) {
	return prev.concat([curr, curr + '/style/index.less']);
}, []);

const relativePath = './dist/static';
const isProd = process.env.NODE_ENV === 'production';
let jsSuffix = '';
let cssSuffix = '';

var suffix = '';
var plugins = [];
if (process.env.NODE_ENV === 'production') {
	// jsSuffix = '.[chunkHash:8]';
	// cssSuffix = '.[contenthash:8]';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
      exclude:/\.min\.js$/,
      sourceMap: 'source-map',
      mangle: {
        except: ['$','jQuery']
      },
  		compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        drop_debugger: true,
        drop_console: true,
      },
      output: {
        comments: false
      },
      except:['exports', 'require']
  }));
	plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
	plugins.push(new webpack.LoaderOptionsPlugin({
			minimize: true,
	}))
}
module.exports = {
    entry: entry,
    output: {
        filename: `[name]${suffix}.js`,
        path: path.join(__dirname, relativePath),
        library: '[name]_lib'
    },
		module: {
        rules: loadRules,
        noParse: [/\.min\.js$/]
    },
    plugins: [
        new CleanWebpackPlugin(['../dist'], {
            root: path.join(__dirname),
            verbose: true,
            dry: false
        }),

				new ExtractTextPlugin({
	          filename: `[name]${cssSuffix}.css`,
	          disable: false,
	          allChunks: true
	      }),
        new webpack.DllPlugin({
            path: path.join(__dirname, relativePath, '[name]-manifest.json'),
            name: '[name]_lib',
            context: __dirname
        })
    ].concat(plugins)
}

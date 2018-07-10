const ExtractTextPlugin = require('extract-text-webpack-plugin');

const theme = require('./theme.json').values;
const cssOption = {
    use: [
        'css-loader',
        'postcss-loader',
    ],
    fallback: 'style-loader'
};
const lessOption = {
    use: [
        'css-loader',
        'postcss-loader',
        `less-loader?{modifyVars:${JSON.stringify(theme)}}`
    ],
    fallback: 'style-loader'
};

const scssOption = {
	use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        camelCase: true,
        localIdentName: '[name]__[local]--[hash:base64:5]'
      }
    },
	  'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
      }
    },
	],
	fallback: 'style-loader'
};

const excludePath = /node_modules\/(?!@(hfe|dp))/;
const isDev = process.env.NODE_ENV !== 'production';

const cssloadRule = {
   test: /\.css$/,
   use: ExtractTextPlugin.extract(cssOption)
};
const lessloadRule = {
   test: /\.less$/,
   use: ExtractTextPlugin.extract(lessOption)
};
const scssloadRule = {
   test: /\.scss$/,
   use: ExtractTextPlugin.extract(scssOption)
};

const jsloadRule = {
    test: /\.(es6|js)$/,
    use: [{
        loader: 'babel-loader',
        options: {
            cacheDirectory: isDev,
            forceEnv: isDev ? 'dev' : 'prod'
        }
    }],
    exclude: /node_modules\/(?!@(hfe|dp))/
};

// const isProd = process.env.NODE_ENV === 'production';
// const suffix = isProd ? '.[hash:8]' : '';
const suffix = '';

const imgloadRule = {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 25000,
            name: `images/[name]${suffix}.[ext]`
        }
    }]
}

const fontloadRule = {
    test: /\.woff|ttf|woff2|eot|swf$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 100000,
            name: `fonts/[name]${suffix}.[ext]`
        }
    }]
};

module.exports = [ jsloadRule, cssloadRule, lessloadRule, scssloadRule, imgloadRule, fontloadRule ];

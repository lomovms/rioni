const path = require('path')
const fs = require("fs")
const webpack = require('webpack')
const globImporter = require('node-sass-glob-importer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const glob = require('glob')

const PATHS = {
	app: path.join(__dirname, './app'),
	build: path.join(__dirname, './build'),
	appAssets: path.join(__dirname, './app/assets'),
	buildAssets: path.join(__dirname, './build/assets'),
	assets: 'assets'
}

const PAGES_DIR = `${PATHS.app}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: `${PATHS.app}/js/app.js`
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: `js/[name].[hash].js`,
		// publicPath: '/'
		publicPath: '/html/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'libs',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				// pug
				test: /\.pug$/,
				loader: 'pug-loader',
				query: {
					pretty: true
				}
			},
			{
				// js
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				// fonts
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			},
			{
				// scss
				test: /\.scss/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sassOptions: {
								importer: globImporter()
							}
						}
					}
				]
			},
			{
				// css
				test: /\.css/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				// images
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'~': PATHS.app,
			'~components': `${PATHS.app}/components`,
			'~node': 'node_modules/',
		}
	},
	plugins: [

		new webpack.ProvidePlugin({
            "jQuery": "jquery",
            "window.jQuery": "jquery",
            "jquery": "jquery",
            "window.jquery": "jquery",
            "$": "jquery",
			"window.$": "jquery",
			// "noUiSlider": "nouislider",
			// "wNumb": "wnumb"
		}),

		// формирование css файла
		new MiniCssExtractPlugin({
			filename: `css/style.[hash].css`
		}),

		new CleanWebpackPlugin(),

		// сборка pug + json в html
		...PAGES.map(page => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			filename: `./${page.replace(/\.pug/,'.html')}`,
			templateParameters: require(`${PATHS.app}/data/${page.replace(/\.pug/,'.json')}`),
			minify: {
				collapseWhitespace: false,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: false,
				removeStyleLinkTypeAttributes: false,
				useShortDoctype: false
			}
		} )),

		// Спрайт svg
		new SVGSpritemapPlugin(`${PATHS.appAssets}/images/svg/*.svg`, {
			output: {
				filename: `${PATHS.assets}/images/required/sprite.svg`,
				svg4everybody: false,
				svgo: {
					removeTitle: false,
					removeStyleElement: false,
					cleanupNumericValue: false,
				}
			},
			sprite: {
				prefix: false
			}
		}),

		// копирование файлов из app в build
		new CopyWebpackPlugin({
			patterns: [
				{
					from: `${PATHS.appAssets}/images`,
					globOptions: {
						dot: true,
						ignore: [
							'**/svg/**'
						]
					},
					to:   `${PATHS.buildAssets}/images`,
				},
				{
					from: `${PATHS.appAssets}/fonts`,
					to:   `${PATHS.buildAssets}/fonts`
				}
			]
		})
	]
}

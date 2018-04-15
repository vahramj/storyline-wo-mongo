const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	devtool: "source-map",
	// devtool: "cheap-module-eval-source-map",

	// "babel-plyfill" is for async/await support
	entry: ["babel-polyfill", "./src/index.jsx"],
	output: {
		path: path.join(__dirname, "static"),
		filename: "bundle.js",
		publicPath: "/static/"
	},
	resolve: {
		extensions: [".js", ".jsx", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				// use: ["style-loader", "css-loader", "postcss-loader"]
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					// use: ["css-loader","postcss-loader"]
					use: ["css-loader"]
				})
			}
		]
	},
	devServer: {
		// inline: false
		historyApiFallback: true,
		// publicPath: "/static/",
		// contentBase: "./",
	},
	plugins: [ 
		new ExtractTextPlugin("styles.css")
	],
};





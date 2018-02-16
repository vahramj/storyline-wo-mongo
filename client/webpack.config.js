const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	devtool: "cheap-module-eval-source-map",
	entry: "./src/index.jsx",
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
	},
	plugins: [ 
		new ExtractTextPlugin("styles.css") 
	]
};
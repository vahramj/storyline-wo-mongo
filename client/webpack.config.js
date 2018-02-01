const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	// // come back to this when running webpack builds in subdirectories, 
		// // multiple entry outputs
	// context: __dirname,
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
			// {
			// 	test: /\.css$/,
			// 	// use: ["style-loader", "css-loader"],
			// 	loader: ExtractTextPlugin.extract({
			// 		loader: "css-loader"
			// 	})
			// }
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	devServer: {
		inline: true
	},
	plugins: [ 
		new ExtractTextPlugin("styles.css") 
	]
};
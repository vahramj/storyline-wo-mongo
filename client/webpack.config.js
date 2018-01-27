const path = require("path");

module.exports = {
	// // come back to this when running webpack builds in subdirectories, 
		// // multiple entry outputs
	// context: __dirname,
	entry: "./src/index.jsx",
	output: {
		path: path.join(__dirname, "static"),
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".js", ".jsx", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader"
			}
		]
	}
};